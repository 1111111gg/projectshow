window.preBoard = [];
define(['./constants'], function (CONSTANTS) {

    return {
        getBoardDescriptor: (core, META, boardNode, nodeHash) => {

            let rows = 8;
            let cols = 8;
            const board = [];

            for (let row = 0; row < rows; row++) {
               board[row] = [];
               for (let column = 0; column < cols; column++) {
                board[row][column]=CONSTANTS.PIECE.EMPTY;
               }
             }


            core.getChildrenPaths(boardNode).forEach(tile => {

                const node = nodeHash[tile];
                if(core.isInstanceOf(node,META.Tile)){

                const row = Number(core.getAttribute(node, 'row')) ;
                const col = Number(core.getAttribute(node, 'column'));  

                let value = CONSTANTS.PIECE.EMPTY;
                const pieces = core.getChildrenPaths(node);

                if(pieces.length > 0) {
                    if(core.isInstanceOf(nodeHash[pieces[0]], META.Piece)){
                        
                        value =  core.getAttribute(nodeHash[pieces[0]],'color')==='white'? 
                        CONSTANTS.PIECE.WHITE : CONSTANTS.PIECE.BLACK;
                    }

                }

                board[row][col] = value;
            }

            });


            return board

        },
        getPositionHash: (core,META, boardNode, nodeHash) => {
            const hash = [];

            
            for (let row = 0; row < 8; row++) {
                hash[row] = [];
                for (let column = 0; column < 8; column++) {
                    hash[row][column] = null; 
                }
            }
            
            core.getChildrenPaths(boardNode).forEach(tile => {
                const node = nodeHash[tile];
                if(core.isInstanceOf(node,META.Tile)){
                const row = Number(core.getAttribute(node, 'row')) ;
                const col = Number(core.getAttribute(node, 'column'));
                hash[row][col] = core.getPath(node);
            }});
        
            return hash;
        }
    }
});

