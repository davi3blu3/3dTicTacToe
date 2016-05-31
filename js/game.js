var board = [" ", " ", " ", " ", " ", " ", " ", " ", " "];

display_board(board);


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
}

//function position_taken?(board, location) {
//  board[location] != " " && board[location] != ""
//}
//
//function valid_move?(board, location) {
//  location.between?(0,8) && !position_taken?(board, location)
//}
//
//function turn(board) {
//  console.log( "Please enter 1-9:");
//  input = gets.strip
//  location = input.to_i-1
//  if valid_move?(board, location)
//    move(board, location)
//    display_board(board)
//  else
//    turn(board)
//  end
//}

