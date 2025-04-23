import CONSTANTS from 'constants.js';
import Tile from './tile';
import Undo from './undo';
import Auto from './auto';

export default function Board({player, board, win}) {

    function countPieceNum(board, piece) {
        return board.reduce((count, line) => count + line.filter(item => item === piece).length, 0);
    }
    

    const getTiles = () => {
        const tiles = [];
        console.log(board)
        board.forEach((row, rowIndex) => {
            row.forEach((value, colIndex) => {
                tiles.push(
                    <Tile 
                        key={'tile_' + rowIndex + '_' + colIndex} 
                        player={player} 
                        piece={value} 
                        row={rowIndex} 
                        column={colIndex} 
                        win={win}
                        board = {board}
                    />
                );
            });
        });
        

        return tiles;
    }
    const getUndo = () => {

 
        
        return (             
        <Undo 
            key={'undo_' + player} 
            player = {player}
        />);
    }
    const getAuto = () => {


        
        return (             
        <Auto 
            key={'Auto_' + player} 
            player = {player}
            win={win}
            board = {board}
            
        />);
    }

    return (

<div>
  <table style={{ borderCollapse: 'collapse', width: '100%' }}>
    <thead>
      <tr>
        <th style={{ border: '1px solid black', padding: '4px', textAlign: 'left' }}>white piece number</th>
        <th style={{ border: '1px solid black', padding: '4px', textAlign: 'left' }}>black piece number</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style={{ border: '1px solid black', padding: '4px', textAlign: 'left' }}>{countPieceNum(board,'w')}</td>
        <td style={{ border: '1px solid black', padding: '4px', textAlign: 'left' }}>{countPieceNum(board,'b')}</td>
      </tr>
    </tbody>
  </table>
  <div style={{ display: 'flex', flexDirection: 'row' }}>
    {getUndo()}
    {getAuto()}
  </div>





        <div style={{
            display:'grid',
            gridTemplateColumns: 'repeat(8, 1fr)',
            gap: '0px',
            width: '300px'
        }}>
            {getTiles()}
        </div>
     
        </div>


    )
}