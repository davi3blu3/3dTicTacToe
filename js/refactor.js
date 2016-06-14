$(document).ready(function() {
    var stopClick = true, // disables click during reset
        board = [" ", " ", " ", " ", " ", " ", " ", " ", " "],
        winResult;
    
    cascade();
    display_board(board);
    
    // START OF GAME CASCADING ANIMATION
    function cascade() {
        $('.cascade-1').afterTime(2000, function () {
            $('.cascade-1').addClass("clearBlock");
        });
        $('.cascade-2').afterTime(2250, function () {
            $('.cascade-2').addClass("clearBlock");
        });
        $('.cascade-3').afterTime(2500, function () {
            $('.cascade-3').addClass("clearBlock");
        });
        $('.cascade-4').afterTime(2750, function () {
            $('.cascade-4').addClass("clearBlock");
        });
        $('.cascade-5').afterTime(3000, function () {
            $('.cascade-5').addClass("clearBlock");
        });
        $('.cascade-6').afterTime(3250, function () {
            $('.cascade-6').addClass("clearBlock");
            stopClick = false;
        });       
    }

    // RESET GAME AND GAME BOARD ON RESET BUTTON CLICK
    $('#reset-btn').click(function() {
        $('.box').removeClass('showRight');
        $('.box').removeClass('showLeft');
        $('.box').removeClass('clearBlock');
        $('#banner').html("TIC-TAC-TOE!");
        board = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
        stopClick = true;
        turn = true;
        cascade();
    })
    
    // INDIVIDUAL BUTTON CLICKED
    $('.box').on("click", function() {
        //disabled click during reset animation
        if (!stopClick) {
            $(this).removeClass('clearBlock');
            var location = ( $(this).attr('id') );
            $(this).addClass('showRight');
            if(!xMove(location, "X")) {
                var oLoc = oMove();
                $('#' + oLoc).afterTime(1000, function() {
                    $('#' + oLoc).addClass('showLeft');
                    return (stopClick = false);
                });
            };
        }
    });
    
    // DISPLAY GAMEBOARD IN CONSOLE
    function display_board(board) {
        console.log( " " + board[0] + " | " + board[1] + " | " + board[2] + " ");
        console.log( "-----------");
        console.log( " " + board[3] + " | " + board[4] + " | " + board[5] + " ");
        console.log( "-----------");
        console.log( " " + board[6] + " | " + board[7] + " | " + board[8] + " ");
    }

    //RETURN ARRAY OF AVAILABLE GAME SPACES
    function availableMoves(board) {
        var moves = [],
            i;
        for (i = 0; i < board.length; i += 1) {
            if (board[i] === " ") {
                moves.push(i);
            }
        }
        return moves;
    }

    // PLAYER MOVES FOR X
    function xMove(location, player) {
        stopClick = true;
        console.log("Move to " + location + " by X");
        board[location] = "X";
        display_board(board);
        return checkWin(board);
    }

    // COMPUTER MOVES FOR O
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

    // CHECK TO SEE IF GAME HAS BEEN WON
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
        // GAME IS OVER
        if (winResult != undefined) {
            console.log(winResult);
            $("#banner").html(winResult);
            winResult = undefined;
            return true;
        }
        return false;
    }
});

jQuery.fn.extend({
    afterTime: function (sec, callback) {
        that = $(this);
        setTimeout(function () {
            callback.call(that);
        }, sec);
        return this;
    }
});