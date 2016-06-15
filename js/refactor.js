$(document).ready(function() {
    var stopClick = true; // disables click during reset
    var game = {
        turn: 1,
        board: [" ", " ", " ", " ", " ", " ", " ", " ", " "],
        
        reset: function() {
            $('.box').removeClass('showRight');
            $('.box').removeClass('showLeft');
            $('.box').removeClass('clearBlock');
            $('#banner').html("TIC-TAC-TOE!");
            this.board = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
            stopClick = true;
            this.turn = 1;
            cascade();
        },

        // DISPLAY GAMEBOARD IN CONSOLE
        display_board: function(board) {
            console.log( " " + board[0] + " | " + board[1] + " | " + board[2] + " ");
            console.log( "-----------");
            console.log( " " + board[3] + " | " + board[4] + " | " + board[5] + " ");
            console.log( "-----------");
            console.log( " " + board[6] + " | " + board[7] + " | " + board[8] + " ");
        },

        //RETURN ARRAY OF AVAILABLE GAME SPACES
        availableMoves: function() {
            var moves = [],
                i;
            for (i = 0; i < this.board.length; i += 1) {
                if (this.board[i] === " ") {
                    moves.push(i);
                }
            }
            return moves;
        },

        // PLAYER MOVES FOR X
        xMove: function(location, player) {
            stopClick = true;
            console.log("Turn " + this.turn + " move to " + location + " by X");
            this.board[location] = "X";
            //this.display_board(this.board);
            this.turn += 1;
            return this.checkWin(this.board);
        },

        // COMPUTER MOVES FOR O
        oMove: function() {
            var avail = this.availableMoves(this.board);

            // select random available space
            var location = avail[Math.floor(Math.random()*avail.length)];

            console.log("Turn " + this.turn + " move to " + location + " by O");
            this.board[location] = "O";
            //this.display_board(this.board);
            this.checkWin(this.board);
            this.turn += 1;
            return location;
        },

        // CHECK TO SEE IF GAME HAS BEEN WON
        checkWin: function(board) {
            var winResult;
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
            // GAME IS TIED
            if (winResult == undefined && game.turn == 10) {
                winResult = "TIED!";
                console.log(winResult);
                $("#banner").html(winResult);
                $('#banner').afterTime(2000, function () {
                    game.reset();
                });
                return true;
            }
            // GAME IS OVER
            if (winResult != undefined) {
                console.log(winResult);
                $("#banner").html(winResult);
                $('#banner').afterTime(2000, function () {
                    game.reset();
                });
                return true;
            }
            return false;
        }

        };
    
    cascade();
    game.display_board(game.board);
    
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
        game.reset();
    })
    
    // INDIVIDUAL BUTTON CLICKED
    $('.box').on("click", function() {
        //disabled click during reset animation
        if (!stopClick) {
            $(this).removeClass('clearBlock');
            var location = ( $(this).attr('id') );
            $(this).addClass('showRight');
            if(!game.xMove(location, "X")) {
                var oLoc = game.oMove();
                $('#' + oLoc).afterTime(1000, function() {
                    $('#' + oLoc).addClass('showLeft');
                    return (stopClick = false);
                });
            };
        }
    });
    
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