$(document).ready(function() {
    // GLOBAL VARIABLES
    var stopClick = true, // disables click during reset
        userChar, // is user playing X or O
        compChar; // is computer playing X or O

    // GAME OBJECT CONSTRUCTOR
    var game = function(board) {

        this.board = board || [" ", " ", " ", " ", " ", " ", " ", " ", " "];

        this.reset = function() {
            $('.box').removeClass('showX');
            $('.box').removeClass('showO');
            $('.box').removeClass('clearBlock');
            $('.box > li').removeClass('winColor');
            this.board = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
            stopClick = true;
            this.turn = 1;
            cascade();
        };

        // DISPLAY GAMEBOARD IN CONSOLE
        // this.displayBoard = function(board) {
        //     console.log( " " + board[0] + " | " + board[1] + " | " + board[2] + " ");
        //     console.log( "-----------");
        //     console.log( " " + board[3] + " | " + board[4] + " | " + board[5] + " ");
        //     console.log( "-----------");
        //     console.log( " " + board[6] + " | " + board[7] + " | " + board[8] + " ");
        // };

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
            //console.log("Turn " + this.turn + " move to " + location + " by " + char);
            this.board[location] = userChar;
            return this.checkWin();
        };

        // COMPUTER MOVES
        this.oMove = function() {
            this.turn += 1;
            
            //DUMB AI
            // var avail = this.availableMoves(this.board);
            // var location = avail[Math.floor(Math.random()*avail.length)];

            // NOT WORKING AI
            // var result = bestMoveAndScore(newGame);
            // var location = result.move;
            //console.log("Turn " + this.turn + " move to " + location + " by " + char);

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
                    //console.log(winResult);
                    $('#' + combos[i][0] + ' > li').addClass("winColor");
                    $('#' + combos[i][1] + ' > li').addClass("winColor");
                    $('#' + combos[i][2] + ' > li').addClass("winColor");
                    $('.box').afterTime(2500, function () {
                        newGame.reset();
                    });
                    return winResult;
                }
            }
            // GAME IS TIED
            if (winResult == undefined && game.turn == 10) {
                winResult = "TIED!";
                //console.log(winResult);
                $('.box').afterTime(2500, function () {
                    game.reset();
                });
                //console.log(this.scoreFinishedGame(winResult));
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
    
    function bestMoveAndScore(game) {
        var bestMove;
        var bestScore = -2;
        game.availableMoves().forEach(function (move) {
            var score = scoreMove(game, move);
            //console.log(score);
            if (score > bestScore) {
                bestMove = move;
                bestScore = score;
            }
        });
        return {move: bestMove, score: bestScore};
    }

    function scoreMove(game, move) {
        var after = game.applyMove(move);
        if (after.availableMoves().length === 0) {
            return after.scoreFinishedGame();
        }
        var reply = bestMoveAndScore(after);
        return -reply.score;
    }


    var newGame = new game();


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
    
    // START OF GAME / RESET CASCADING ANIMATION
    function cascade() {        
        var cascadeArr = [".cascade-1", ".cascade-2", ".cascade-3", ".cascade-4", ".cascade-5", ".cascade-6", ],
            time = 2000
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
    
    // GAME SPACE BOX CLICKED
    $('.box').on("click", function() {
        //disabled click during reset animation
        if (!stopClick) {
            $(this).removeClass('clearBlock');
            var location = ( $(this).attr('id') );
            $(this).addClass('show' + userChar);
            
            if(!newGame.xMove(location)) {
                var oLoc = newGame.oMove();
                // console.log(typeof oLoc);
                $('#' + oLoc).afterTime(1000, function() {
                    $('#' + oLoc).addClass('show' + compChar);
                    if (!newGame.checkWin()) {
                        //console.log(newGame.availableMoves());
                        stopClick = false;
                    };
                    
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