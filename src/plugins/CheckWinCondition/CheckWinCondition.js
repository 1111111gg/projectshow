/*globals define*/
/*eslint-env node, browser*/

/**
 * Generated by PluginGenerator 2.20.5 from webgme on Fri Jul 21 2023 23:41:07 GMT-0500 (Central Daylight Time).
 * A plugin that inherits from the PluginBase. To see source code documentation about available
 * properties and methods visit %host%/docs/source/PluginBase.html.
 */

function countPiece(board, piece) {
    let count = 0
    board.forEach((line) => line.forEach((item) => {
        if (item === piece) {
            count++
        }
    }))
    return count
}
define([
    'plugin/PluginConfig',
    'text!./metadata.json',
    'plugin/PluginBase',
    'mic-react-viz/utils',
    'mic-react-viz/constants'
], function (
    PluginConfig,
    pluginMetadata,
    PluginBase,
    UTILS,
    CONSTANTS) {
    'use strict';

    pluginMetadata = JSON.parse(pluginMetadata);

    /**
     * Initializes a new instance of CheckWinCondition.
     * @class
     * @augments {PluginBase}
     * @classdesc This class represents the plugin CheckWinCondition.
     * @constructor
     */
    function CheckWinCondition() {
        // Call base class' constructor.
        PluginBase.call(this);
        this.pluginMetadata = pluginMetadata;
    }

    /**
     * Metadata associated with the plugin. Contains id, name, version, description, icon, configStructure etc.
     * This is also available at the instance at this.pluginMetadata.
     * @type {object}
     */
    CheckWinCondition.metadata = pluginMetadata;

    // Prototypical inheritance from PluginBase.
    CheckWinCondition.prototype = Object.create(PluginBase.prototype);
    CheckWinCondition.prototype.constructor = CheckWinCondition;

    /**
     * Main function for the plugin to execute. This will perform the execution.
     * Notes:
     * - Always log with the provided logger.[error,warning,info,debug].
     * - Do NOT put any user interaction logic UI, etc. inside this method.
     * - callback always has to be called even if error happened.
     *
     * @param {function(Error|null, plugin.PluginResult)} callback - the result callback
     */
    CheckWinCondition.prototype.main = function (callback) {

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
        
        // Use this to access core, project, result, logger etc from PluginBase.
        const {core, META, logger, activeNode, result} = this;

        core.loadSubTree(activeNode)
        .then(nodes=>{
            const nodeHash = {};
            nodes.forEach(node => {
                nodeHash[core.getPath(node)] = node;
            });
            let boardNode = null;
            core.getChildrenPaths(activeNode).forEach(playerOrBoard => {
                const node = nodeHash[playerOrBoard];
                if(core.isInstanceOf(node,META.Board)) {
                   boardNode = node;
                }
            });

            const board = UTILS.getBoardDescriptor(core, META, boardNode, nodeHash);
        
       

            let winner = null;
            const whitePieceNum = countPiece(board, 'w');
            const blackPieceNum = countPiece(board, 'b');

            const whitePlaceable = PlaceblePos(board, 'w');
            const blackPlaceable = PlaceblePos(board, 'b');
            
            if (whitePieceNum + blackPieceNum === 64 || whitePlaceable.length === 0 && blackPlaceable.length === 0) {
                winner = {
                    flag: 1,
                    player: whitePieceNum > blackPieceNum ? CONSTANTS.PLAYER.WHITE : CONSTANTS.PLAYER.BLACK
                };
            } else if (whitePieceNum === 0 || blackPieceNum === 0) {
                winner = {
                    flag: 1,
                    player: whitePieceNum > blackPieceNum ? CONSTANTS.PLAYER.WHITE : CONSTANTS.PLAYER.BLACK
                };
            }

        


            
            this.createMessage(activeNode, JSON.stringify(winner));

            result.setSuccess(true);
            callback(null, result);
        })
        .catch(e=>{
            
            logger.error(e);
            result.setSuccess(false);
            callback(e, null);
        });
    };

    return CheckWinCondition;
});
