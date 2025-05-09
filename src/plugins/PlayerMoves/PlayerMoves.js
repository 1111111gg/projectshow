/*globals define*/
/*eslint-env node, browser*/


/**
 * Generated by PluginGenerator 2.20.5 from webgme on Tue Jul 25 2023 20:14:30 GMT-0500 (Central Daylight Time).
 * A plugin that inherits from the PluginBase. To see source code documentation about available
 * properties and methods visit %host%/docs/source/PluginBase.html.
 */




define([
    'plugin/PluginConfig',
    'text!./metadata.json',
    'plugin/PluginBase',
    'mic-react-viz/constants',
    'mic-react-viz/utils'
], function (
    PluginConfig,
    pluginMetadata,
    PluginBase,
    CONSTANTS,
    UTILS) {
    'use strict';

    pluginMetadata = JSON.parse(pluginMetadata);



    /**
     * Initializes a new instance of PlayerMoves.
     * @class
     * @augments {PluginBase}
     * @classdesc This class represents the plugin PlayerMoves.
     * @constructor
     */
    function PlayerMoves() {
        // Call base class' constructor.
        PluginBase.call(this);
        this.pluginMetadata = pluginMetadata;
    }

    /**
     * Metadata associated with the plugin. Contains id, name, version, description, icon, configStructure etc.
     * This is also available at the instance at this.pluginMetadata.
     * @type {object}
     */
    PlayerMoves.metadata = pluginMetadata;

    // Prototypical inheritance from PluginBase.
    PlayerMoves.prototype = Object.create(PluginBase.prototype);
    PlayerMoves.prototype.constructor = PlayerMoves;

    /**
     * Main function for the plugin to execute. This will perform the execution.
     * Notes:
     * - Always log with the provided logger.[error,warning,info,debug].
     * - Do NOT put any user interaction logic UI, etc. inside this method.
     * - callback always has to be called even if error happened.
     *
     * @param {function(Error|null, plugin.PluginResult)} callback - the result callback
     */
    PlayerMoves.prototype.main = function (callback) {
        
        //learn othello game by https://github.com/ksakiyama/react-othello
        function PlaceblePos(board, color){
     
            function canPlaceByDir(i, j, dir_i, dir_j) {
            
                if (i === 0 && j === 0 && dir_i === 1 && dir_j === 1) {
                    console.log('break');
                    return false;
                }
            
                let flag = false;
                let finished = false;
            
                while (true) {
                    i += dir_i;
                    j += dir_j;
            
                    if (i < 0 || i > 7 || j < 0 || j > 7 || board[i][j] === '-') {
                        break;
                    }
            
                    switch (board[i][j]) {
                        case ((color === 'w') ? 'b' : 'w'):
                            finished = true;
                            break;
            
                        case color:
                            if (!finished) {
                                break;
                            }
                            flag = true;
                            break;
            
                        default:
                            break;
                    }
                }
            
                return flag;
            }
        
      
            let Placedirection=[
                [-1, 0], [1, 0], [0, -1], [0, 1],
                [-1, -1], [-1, 1], [1, -1], [1, 1]
            ];
    
            function isPlaceble(i, j) {
                for (let direction of Placedirection) {
                    let [dx, dy] = direction;
                    if (canPlaceByDir(i, j, dx, dy)) {
                        return true; 
                    }
                }
                
                return false;  
            }
        
        let placeblePos = []
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                if (board[row][col] === '-' && isPlaceble(row, col)) {
                    placeblePos.push([row, col])
                }
            }
            }
        
        return placeblePos
        
        }
  

        function getFlippedPos(board, i, j, player) {
            const directions = [
                [-1, 0], [1, 0], [0, -1], [0, 1],
                [-1, -1], [-1, 1], [1, -1], [1, 1]
            ];
        
            const opponentPlayer = player === 'w' ? 'b' : 'w';
            const flippedPositions = [];
        
            for (const direction of directions) {
                const [dx, dy] = direction;
                let x = i + dx;
                let y = j + dy;
                let shouldFlip = false;
                let positionsToFlip = [];
        
                while (x >= 0 && x < 8 && y >= 0 && y < 8) {
                    const cell = board[x][y];
        
                    if (cell === opponentPlayer) {
                        shouldFlip = true;
                        positionsToFlip.push([x, y]);
                        x += dx;
                        y += dy;
                    } else if (cell === player && shouldFlip) {
                        flippedPositions.push(...positionsToFlip);
                        break;
                    } else {
                        break;
                    }
                }
            }
        
            return flippedPositions;
        }
        
        function arraysAreEqual(arr1, arr2) {
      
            if (arr1.length !== arr2.length) {
                return false;
            }
            for (let i = 0; i < arr1.length; i++) {
                if (arr1[i] !== arr2[i]) {
                    return false;  
                }
            }
            return true;
        }
        function containsArray(haystack, needle) {
            return haystack.some(element => arraysAreEqual(element, needle));
        }
        
        function copy2dArray(arr) {
            return arr.map(row => [...row]);
        }
        // Use this to access core, project, result, logger etc from PluginBase.
        const {core, activeNode, META, result} = this;
        const config = this.getCurrentConfig();

        const nodeHash = {};
      
        const currentPlayerPath = core.getPointerPath(activeNode,'currentPlayer');
        let nextPlayerPath = currentPlayerPath;
        let posPath = {};
        let board = [];
        let needToFlip = []; 
        let noMove=false;

        let myPlayPath=currentPlayerPath;
        let newboard=[];

        

 
        let placeNewnode=META.Piece
        core.loadSubTree(activeNode)
        .then(nodes => {
            nodes.forEach(node => {
                nodeHash[core.getPath(node)] = node;
            });
          


            const color = core.getAttribute(nodeHash[currentPlayerPath], 'name') === 'PlayerBlack' ?
                'black':'white';
            let setColour = color==='white'?'w':'b'
            let nextcolor = color==='white'?'b':'w'
            core.getChildrenPaths(activeNode).forEach(path => {
                if(core.isInstanceOf(nodeHash[path], META.Player) && core.getAttribute(nodeHash[path],'color') !== color)
                 {
                    nextPlayerPath = path;
                } else if (core.isInstanceOf(nodeHash[path], META.Board)) {
                    posPath = UTILS.getPositionHash(core,META, nodeHash[path], nodeHash);
                    board = UTILS.getBoardDescriptor(core, META, nodeHash[path], nodeHash);
                    
               
                } if(core.isInstanceOf(nodeHash[path], META.Player) && core.getAttribute(nodeHash[path],'color') === color)
                {
                    myPlayPath=path;

                }
            });

          
            let tempBoard = copy2dArray(board)
           
            window.preBoard.push(tempBoard)
            


            let playerMove = [config.row,config.column]
            let placeble = PlaceblePos(board,setColour)
            
           

            if(placeble.length>0&&containsArray(placeble,playerMove)){
     
            board[config.row][config.column] = setColour
            


            needToFlip = getFlippedPos(board,config.row,config.column,setColour)
            console.log(needToFlip)
            if(needToFlip.length!==0){
                for (const [row, col] of needToFlip) {
                    console.log(core.getChildrenPaths(nodeHash[posPath[row][col]]))
              
                    core.setAttribute(nodeHash[core.getChildrenPaths(nodeHash[posPath[row][col]])],'color',color)
    
                
    
    
                }
            }
           core.setAttribute(core.createNode({
            
                parent: nodeHash[posPath[config.row][config.column]],
                base: placeNewnode
                
            }),'color',color)

            console.log(board)
            
            noMove=false;
           


            return this.invokePlugin('CheckWinCondition',{pluginConfig:{}});
        }else if(placeble.length>0&&!containsArray(placeble,playerMove)){
            console.log('wrong move!')
            return ;
        }else if(placeble.length===0){
            noMove=true;
            //core.setPointer(activeNode, 'currentPlayer', nodeHash[myPlayPath]);
            
            return this.invokePlugin('CheckWinCondition',{pluginConfig:{}});
           

        }
        
        
    })
        .then(innerResult => {
            console.log(innerResult);
            const win = JSON.parse(innerResult.messages[0].message);
         
            if (!win) {
               
              
                if (!noMove) {
                    core.setPointer(activeNode, 'currentPlayer', nodeHash[nextPlayerPath]);
                } else {
                    core.setPointer(activeNode, 'currentPlayer', nodeHash[myPlayPath]);
                }

              
                return this.save('Player moved to position [' + (config.row + 1) + ']' + '[' + (config.column + 1) + '].');
              
            }
         
         

    
            
        })
        .then(() => {
            result.setSuccess(true);
            callback(null, result);
        })
        .catch(error => {
            callback(error, null);
        })

    };

    return PlayerMoves;
});
