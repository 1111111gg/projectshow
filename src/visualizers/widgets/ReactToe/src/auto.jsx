import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { useState } from 'react';
import CONSTANTS from 'constants.js';

export default function Auto({player, win, board}) {
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
    
    function randomPlace(arr) {
        if (arr && arr.length) {
            const randomIndex = Math.floor(Math.random() * arr.length);
            return arr[randomIndex];
        }
        return null; 
    }
  


    const [hasMouse, setMouse, onHasMouseChange] = useState(false);

    const onAutoClick = () => {
        let possiblePos = PlaceblePos(board,player)
        let playerMove = randomPlace(possiblePos)
        WEBGME_CONTROL.playerMoves(player, playerMove[0],playerMove[1]);
        
    }



    const getAuto = () => {
        
        return (<div> 
            <button
            onClick={onAutoClick} >Auto</button></div>);
    }

    return getAuto();
}