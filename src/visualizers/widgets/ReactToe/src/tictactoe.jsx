import React, {useCallback, useState} from 'react';
import Board from './board';
import CONSTANTS from 'constants.js';

export default function TicTacToe({player, win, board}) {
    
    const getLabel = () => {
        if(!win) {
   

               if (player === CONSTANTS.PLAYER.WHITE) {
                   return 'Player white moves...';
               } else {
                   return 'Player black moves...';
               }
               
               
               
             
             
        } else {
            if(win.player === CONSTANTS.PLAYER.WHITE) {
                return 'Game ended in tie and Player white won!';
            } else {
                return 'Game ended in tie and Player black won!';
            }
        }
    }
    return (
    <div style={{ width: '100%', height: '100%', fontFamily:'fantasy', fontSize:'36px', fontWeight:'bold'}}>
        {getLabel()}
        <Board player={player} board={board} win={win}/>
    </div>
    );

}