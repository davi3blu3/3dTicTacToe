var board = [" ", " ", " ", " ", " ", " ", " ", " ", " "];

display_board(board);

// check game status in console
function display_board(board) {
    console.log( " " + board[0] + " | " + board[1] + " | " + board[2] + " ");
    console.log( "-----------");
    console.log( " " + board[3] + " | " + board[4] + " | " + board[5] + " ");
    console.log( "-----------");
    console.log( " " + board[6] + " | " + board[7] + " | " + board[8] + " ");
}

// move(board, location, current_player = "X")
function move(location, player) {
    console.log("Move to " + location + " by " + player);
    board[location] = player;
    display_board(board);
    checkWin(board);
}

function checkWin(board) {
    if (board [0] != " " && board[0] === board[1] && board[0] === board[2]) {
        console.log( board[0] + " WINS!" );
    }
    if (board [3] != " " && board[3] === board[4] && board[3] === board[5]) {
        console.log( board[3] + " WINS!" );
    }
    if (board [6] != " " && board[6] === board[7] && board[6] === board[8]) {
        console.log( board[6] + " WINS!" );
    }
    if (board [0] != " " && board[0] === board[3] && board[0] === board[6]) {
        console.log( board[0] + " WINS!" );
    }
    if (board [1] != " " && board[1] === board[4] && board[1] === board[7]) {
        console.log( board[1] + " WINS!" );
    }
    if (board [2] != " " && board[2] === board[5] && board[2] === board[8]) {
        console.log( board[2] + " WINS!" );
    }   
    if (board [0] != " " && board[0] === board[4] && board[0] === board[8]) {
        console.log( board[0] + " WINS!" );
    }
    if (board [2] != " " && board[2] === board[4] && board[2] === board[6]) {
        console.log( board[2] + " WINS!" );
    }       
}

