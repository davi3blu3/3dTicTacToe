$(document).ready(function() {
    // GLOBAL VARIABLES
    var stopClick = true, // disables click during reset
        userChar, // is user playing X or O
        compChar; // is computer playing X or O
    
    // GAME OBJECT
    var game = {
        turn: 1,
        board: [" ", " ", " ", " ", " ", " ", " ", " ", " "],
        
        reset: function() {
            $('.box').removeClass('showX');
            $('.box').removeClass('showO');
            $('.box').removeClass('clearBlock');
            $('.box > li').removeClass('winColor');
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
        xMove: function(location, char) {
            stopClick = true;
            console.log("Turn " + this.turn + " move to " + location + " by " + char);
            this.board[location] = char;
            //this.displayBoard(this.board);
            this.turn += 1;
            return this.checkWin(this.board);
        },

        // COMPUTER MOVES FOR O
        oMove: function(char) {
            var avail = this.availableMoves(this.board);

            // select random available space
            var location = avail[Math.floor(Math.random()*avail.length)];

            console.log("Turn " + this.turn + " move to " + location + " by " + char);
            this.board[location] = char;
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
                    $('#' + combos[i][0] + ' > li').addClass("winColor");
                    // console.log("box#" + combos[i][0] + " > li");
                    $('#' + combos[i][1] + ' > li').addClass("winColor");
                    // console.log("box#" + board[combos[i][1]] + " > li");
                    $('#' + combos[i][2] + ' > li').addClass("winColor");
                    // console.log("box#" + board[combos[i][2]] + " > li");
                    $('.box').afterTime(2500, function () {
                        game.reset();
                    });
                    return true;
                }
            }
            // GAME IS TIED
            if (winResult == undefined && game.turn == 10) {
                winResult = "TIED!";
                console.log(winResult);
                $('.box').afterTime(2500, function () {
                    game.reset();
                });
                return true;
            }
            return false;
        }

        };
    
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
    
    game.displayBoard(game.board);
    
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
        stopClick = false;
    }
    
    // GAME SPACE BOX CLICKED
    $('.box').on("click", function() {
        //disabled click during reset animation
        if (!stopClick) {
            $(this).removeClass('clearBlock');
            var location = ( $(this).attr('id') );
            $(this).addClass('show' + userChar);
            
            if(!game.xMove(location, userChar)) {
                var oLoc = game.oMove(compChar);
                // console.log(typeof oLoc);
                $('#' + oLoc).afterTime(1000, function() {
                    $('#' + oLoc).addClass('show' + compChar);
                    if (!game.checkWin(game.board)) {
                        return (stopClick = false);
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