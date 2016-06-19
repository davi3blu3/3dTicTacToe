$(document).ready(function() {
    // GLOBAL VARIABLES
    var stopClick = true; // disables click during reset
    
    // GAME OBJECT
    var game = {
        turn: 1,
        board: [" ", " ", " ", " ", " ", " ", " ", " ", " "],
        
        reset: function() {
            $('.box').removeClass('showX');
            $('.box').removeClass('showO');
            $('.box').removeClass('clearBlock');
            $('#banner').html("TIC-TAC-TOE!");
            this.board = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
            stopClick = true;
            this.turn = 1;
            cascade();
        },

        // DISPLAY GAMEBOARD IN CONSOLE
        displayBoard: function(board) {
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
            //this.displayBoard(this.board);
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
            //this.displayBoard(this.board);
            this.checkWin(this.board);
            this.turn += 1;
            return location;
        },

        // CHECK TO SEE IF GAME IS OVER
        checkWin: function(board) {
            var winResult,
                combos = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]],
                i;
            // GAME IS WON
            for (i = 0; i < combos.length; i += 1) {
                // check if all items in a combo match, and aren't blank
                if (board[combos[i][0]] != " " && board[combos[i][0]] === board[combos[i][1]] && board[combos[i][0]] === board[combos[i][2]]) {
                    winResult = board[combos[i][0]] + " WINS!";
                    console.log(winResult);
                    $("#banner").html(winResult);
                    $('#banner').afterTime(2500, function () {
                        game.reset();
                    });
                    return true;
                }
            }
            // GAME IS TIED
            if (winResult == undefined && game.turn == 10) {
                winResult = "TIED!";
                console.log(winResult);
                $("#banner").html(winResult);
                $('#banner').afterTime(2500, function () {
                    game.reset();
                });
                return true;
            }
            return false;
        }

        };
    
    cascade();
    game.displayBoard(game.board);
    
    // START OF GAME / RESET CASCADING ANIMATION
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
    
    // GAME SPACE BOX CLICKED
    $('.box').on("click", function() {
        //disabled click during reset animation
        if (!stopClick) {
            $(this).removeClass('clearBlock');
            var location = ( $(this).attr('id') );
            $(this).addClass('showX');
            if(!game.xMove(location, "X")) {
                var oLoc = game.oMove();
                $('#' + oLoc).afterTime(1000, function() {
                    $('#' + oLoc).addClass('showO');
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