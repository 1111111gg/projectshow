import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { useState } from 'react';
import CONSTANTS from 'constants.js';

export default function Tile({player, piece, row, column, win, board}) {
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

    const [hasMouse, setMouse, onHasMouseChange] = useState(false);

    const onTileClick = () => {
        if (piece === CONSTANTS.PIECE.EMPTY) {
            WEBGME_CONTROL.playerMoves(player, row,column);
        }
    }

    const onMouseEnter = () => {
        setMouse(true);
    }

    const onMouseLeave = () => {
        setMouse(false);
    }

    const getPiece = () => {
        console.log('GP:',player,piece,row,column, win, board);
        const styleO = {fontSize:'90px', paddingLeft:'8px',paddingTop:'2px'};
        const styleX = {fontSize:'80px', paddingLeft:'8px',paddingTop:'2px'};
        const dStyle = player === CONSTANTS.PLAYER.WHITE ? 
            JSON.parse(JSON.stringify(styleO)) : 
            JSON.parse(JSON.stringify(styleX));
        dStyle.opacity = 0.5;

        let style = dStyle;
        let myIcon = null;
        switch (piece) {
            case CONSTANTS.PIECE.WHITE:
                style = styleO;
                myIcon = icon({name:'o', family:'classic', style:'solid'});
                break;
            case CONSTANTS.PIECE.BLACK:
                style = styleX;
                myIcon = icon({name:'circle', family:'classic', style:'solid'});
                break;
            default:
                if(hasMouse) {
                    if(player === CONSTANTS.PLAYER.WHITE) {
                        myIcon = icon({name:'o', family:'classic', style:'solid'});
                    } else {
                        myIcon = icon({name:'circle', family:'classic', style:'solid'});
                    }
                }
        }

        if(myIcon !== null) {
            return (<FontAwesomeIcon style={style} icon={myIcon} size='xl'/>); 
        }

        return null;
    }

    const getTile = () => {
        const style = {
            width:'100px', 
            height:'100px', 
            borderColor:'black',
            borderWidth:'2px',
            border:'solid'};
            let possiblePos = PlaceblePos(board,player)
            if (win && win.flag === 1) {
                style.backgroundColor = '#EE2E31';
            } else if(hasMouse) {
                if(piece === CONSTANTS.PIECE.EMPTY) {
                    style.backgroundColor = '#F4C095';
                    let nowPos = [row,column]
                    if(possiblePos.length>0&&containsArray(possiblePos,nowPos)){
                        style.backgroundColor = '#00FF00';
                    }
                } else {
                    style.backgroundColor = '#1D7874';
                    style.opacity = 0.75;

                    let nowPos = [row,column]
                    if(possiblePos.length>0&&containsArray(possiblePos,nowPos)){
                        style.backgroundColor = '#00FF00';
                    }

                }
            }else{
                    let nowPos = [row,column]
                    if(possiblePos.length>0&&containsArray(possiblePos,nowPos)){
                        style.backgroundColor = '#00FF00';
                    }

                
            }
            return (<div onClick={onTileClick} 
                style={style}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}>{getPiece()}</div>);
    }

    return getTile();
}