$(document).ready(function() {
    var stopClick = true, // disables click during reset
        userChar, // is user playing X or O
        compChar; // is computer playing X or O

    /*
    /   ***   GAME OBJECT CONSTRUCTOR ***
    */
    var game = function(board, turn) {

        this.board = board || [" ", " ", " ", " ", " ", " ", " ", " ", " "];

        this.turn = turn || 0;

        this.reset = function() {
            this.board = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
            this.turn = 0;
        };


        //RETURN ARRAY OF AVAILABLE GAME SPACES
        this.availableMoves = function() {
            var moves = [],
                i;
            for (i = 0; i < this.board.length; i += 1) {
                if (this.board[i] === " ") {
                    moves.push(i);
                }
            }
            return moves;
        };

        this.turn = 9 - this.availableMoves().length;

        this.applyMove = function(move) {
            var newBoard = this.board;
            newBoard[move] = (this.turn % 2 == 0) ? compChar : userChar;
            var instance = new game(newBoard);
            return instance;
        }

        // PLAYER MOVES
        this.xMove = function(location) {
            this.turn += 1;
            stopClick = true;
            this.board[location] = userChar;
        };

        // COMPUTER MOVES
        this.oMove = function() {
            this.turn += 1;
            var avail = this.availableMoves(this.board);
            var location = avail[Math.floor(Math.random()*avail.length)];
            this.board[location] = compChar;
            return location;
        };

        // CHECK TO SEE IF GAME IS OVER
        this.checkWin = function() {
            var winResult,
                combos = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]],
                i;
            // GAME IS WON
            for (i = 0; i < combos.length; i += 1) {
                // check if all items in a combo match, and aren't blank
                if (this.board[combos[i][0]] != " " && this.board[combos[i][0]] === this.board[combos[i][1]] && this.board[combos[i][0]] === this.board[combos[i][2]]) {
                    winResult = this.board[combos[i][0]] + " WINS!";
                    console.log("checkwin returning " + combos[i]);
                    return combos[i];
                }
            }
            // GAME IS TIED
            if (winResult == undefined && game.turn == 9) {
                winResult = "TIED!";
                return winResult;
            }
            return false;
        };

        this.scoreFinishedGame = function() {
            var winner = this.checkWin();
            console.log("Winner is " + winner[0]);
            if (winner[0] === compChar) {
                return 1;
            } else if (winner[0] === userChar) {
                return -1;
            } else {
                return 0;
            }
        };
    }; // END OF GAME OBJECT CONTRUCTOR

    /*
    /   ***   HANDLE CLICK EVENTS   ***
    */

    // CHARACTER CHOICE at GAME START
    $('button').click(function() {
        $('#modal').fadeOut('slow');
        $('#grey-screen').fadeOut('slow');
        if ($(this).html() === "X") {
            userChar = "X";
            compChar = "O";  
        } else if ($(this).html() === "O") {
            userChar = "O";
            compChar = "X";
        };
        cascade();
    })

    // GAME SPACE BOX CLICKED
    $('.box').on("click", function() {
        var winCombo;
        // check if click is allowed
        if (!stopClick) {

            // animate user move to DOM
            $(this).removeClass('clearBlock');
            $(this).addClass('show' + userChar);

            // capture id of clicked box (location of move)
            var location = ( $(this).attr('id') );
            
            // call xMove which stops click, increments turn
            newGame.xMove(location);

            // check if game over
            winCombo = newGame.checkWin();
            if (!winCombo) {
                // computer's turn
                var oLoc = newGame.oMove();

                // trigger animation
                $('#' + oLoc).afterTime(1000, function() {
                    $('#' + oLoc).addClass('show' + compChar);
                });

                // check if game over
                winCombo = newGame.checkWin();
                console.log("wincombo = " + winCombo);
                if (!winCombo) {
                    stopClick = false;
                } else {
                    console.log("win detected");
                    animateWin(winCombo);
                }; // if / else O won
                    
            } else if (winCombo == "TIED!") {
                // handle tie
                $('.box').afterTime(2500, function () {
                    animateReset();
                    newGame.reset();
                });

            } else {
                console.log("win detected");
                animateWin(winCombo);
            }; // if /else X won
        } // if turn allowed by click
    });

    /*
    /   ***   ANIMATIONS   ***
    */

    // START OF GAME / RESET CASCADING ANIMATION
    function cascade() {        
        var cascadeArr = [".cascade-1", ".cascade-2", ".cascade-3", ".cascade-4", ".cascade-5", ".cascade-6", ],
            time = 2000;
        cascadeArr.forEach( function(number) {
            $(number).afterTime(time, function () {
                $(number).addClass("clearBlock");
            });
            time += 250;
        });
        $(document).afterTime(3250, function () {
            stopClick = false;
            //console.log("click allowed");
        });
    }

    function animateWin(winLoc) {
        $('#' + winLoc[0] + ' > li').addClass("winColor");
        $('#' + winLoc[1] + ' > li').addClass("winColor");
        $('#' + winLoc[2] + ' > li').addClass("winColor");
        $('.box').afterTime(2500, function () {
            animateReset();
            newGame.reset();
        });
    }
    
    function animateReset() {
        $('.box').removeClass('showX');
        $('.box').removeClass('showO');
        $('.box').removeClass('clearBlock');
        $('.box > li').removeClass('winColor');
        stopClick = true;
        cascade();
    }

    jQuery.fn.extend({
        afterTime: function (sec, callback) {
            that = $(this);
            setTimeout(function () {
                callback.call(that);
            }, sec);
            return this;
        }
    });

    var newGame = new game();
});