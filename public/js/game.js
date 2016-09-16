var board = [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    winResult;

display_board(board);

// check game status in console
function display_board(board) {
    console.log( " " + board[0] + " | " + board[1] + " | " + board[2] + " ");
    console.log( "-----------");
    console.log( " " + board[3] + " | " + board[4] + " | " + board[5] + " ");
    console.log( "-----------");
    console.log( " " + board[6] + " | " + board[7] + " | " + board[8] + " ");
}

function availableMoves(board) {
    var moves = [],
        i;
    //check board for empty spaces
    for (i = 0; i < board.length; i += 1) {
        if (board[i] === " ") {
            moves.push(i);
        }
    }
    return moves;
}

// move(board, location, current_player = "X")
function xMove(location, player) {
    console.log("Move to " + location + " by X");
    board[location] = "X";
    display_board(board);
    checkWin(board);

}

function oMove() {
    var avail = availableMoves(board);

    // select random available space
    var location = avail[Math.floor(Math.random()*avail.length)];
    
    console.log("Move to " + location + " by O");
    board[location] = "O";
    display_board(board);
    checkWin(board);
    return location;
}

function checkWin(board) {
    if (board [0] != " " && board[0] === board[1] && board[0] === board[2]) {
        winResult = board[0] + " WINS!";
    }
    if (board [3] != " " && board[3] === board[4] && board[3] === board[5]) {
        winResult = board[3] + " WINS!";
    }
    if (board [6] != " " && board[6] === board[7] && board[6] === board[8]) {
        winResult = board[6] + " WINS!";
    }
    if (board [0] != " " && board[0] === board[3] && board[0] === board[6]) {
        winResult = board[0] + " WINS!";
    }
    if (board [1] != " " && board[1] === board[4] && board[1] === board[7]) {
        winResult = board[1] + " WINS!";
    }
    if (board [2] != " " && board[2] === board[5] && board[2] === board[8]) {
        winResult = board[2] + " WINS!";
    }   
    if (board [0] != " " && board[0] === board[4] && board[0] === board[8]) {
        winResult = board[0] + " WINS!";
    }
    if (board [2] != " " && board[2] === board[4] && board[2] === board[6]) {
        winResult = board[2] + " WINS!";
    }
    if (winResult != undefined) {
        console.log(winResult);
        $("#banner").html(winResult);
        winResult = undefined;
    }
}

