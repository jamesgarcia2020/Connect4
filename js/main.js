/*----- constants -----*/
for (let i = 0; i < 42; i++) {
    let square = document.createElement('div');
    let circle = document.createElement('div');
    circle.id = i;
    square.appendChild(circle);
    document.getElementById('container').appendChild(square);
}

let reset = document.getElementById('reset');
const msg = document.getElementById('msg');

//This is showing each players chip color
const LOOK_UP = {
    1: 'red',
    '-1': 'black',
    null: 'white',
}

/*----- app's state (variables) -----*/
//The state of the board 
let board
    //The players state
let player
let winner

/*----- cached element references -----*/


/*----- event listeners -----*/
//onmouse click add player chip to slot and also makes the next players turn be set.
reset.addEventListener('click', initialize)

document.getElementById('container').addEventListener('click', handleClick)


/*----- functions -----*/
//this sets the board entire board to null so players can choose their slots
//and makes player 1 go first and finally renders the game.
function initialize() {
    board = new Array(42).fill(null);
    player = 1;
    winner = null;
    render();
}

function handleClick(evt) {
    const index = parseInt(evt.target.id);
    let column = index % 7 //column number 

    if (winner || board[column]) return; //if top of column has a value or game has a winner
    let playerChoice = column
    while (board[playerChoice + 7] === null && playerChoice + 7 < 42) {
        //if the next space in the column is not empty and in the array go down to the next space
        playerChoice += 7
    };
    board[playerChoice] = player;
    winner = horizontalCheck() || verticalCheck() || diagonallr() || diagonalrl();
    player *= -1;
    render()
}
//win logic for all possible moves

function diagonalrl() {
    return board.some(function(element, idx) {
        return idx % 7 > 2 && idx < 21 && Math.abs(board[idx] + board[idx + 6] + board[idx + 12] +
            board[idx + 18]) === 4
    })
}

function diagonallr() {
    return board.some(function(element, idx) {
        return idx % 7 < 4 && Math.abs(board[idx] + board[idx + 8] + board[idx + 16] +
            board[idx + 24]) === 4
    })
}

function verticalCheck() {
    return board.some(function(element, idx) {
        return idx + 21 < board.length && Math.abs(board[idx] + board[idx + 7] + board[idx + 14] +
            board[idx + 21]) === 4
    })
}

function horizontalCheck() {
    return board.some(function(element, idx) {
        return idx % 7 < 4 && Math.abs(board[idx] + board[idx + 1] + board[idx + 2] +
            board[idx + 3]) === 4
    })
}

// based on the mouse click this function adds the current players choice to the board.
function render() {
    board.forEach((element, id) => {
        document.getElementById(id).style.backgroundColor = LOOK_UP[element];
        if (winner) {
            msg.innerText = `Player ${player > 0 ? '2' : '1'} Wins!`
        } else {
            msg.innerText = `Player ${LOOK_UP[player].toUpperCase()}'s Turn`
        }
    });
}

initialize()