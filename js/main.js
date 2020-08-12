/*----- constants -----*/
for (let i = 0; i < 42; i++) {
    let square = document.createElement('div');
    let circle = document.createElement('div');
    circle.id = i;
    circle.textContent = 'hello';
    square.appendChild(circle);
    document.getElementById('container').appendChild(square);
    console.log(circle.id)

}


let reset = document.getElementById('reset');




//This will help with finding a winner in the game
const GRID_WIDTH = 7;
const GRID_HEIGHT = 6;
const MATCHES_TO_WIN = 4;

//This is showing each players chip color
const LOOK_UP = {
    1: 'red',
    '-1': 'black',
    null: 'white',
};

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
    console.log(column);
    if (winner || board[column]) return; //if top of column has a value or game has a winner
    let playerChoice = column
    while(board[playerChoice + 7] === null && playerChoice + 7 < 42) {
        //if the next space in the column is not empty and in the array go down to the next space
        playerChoice += 7 
    };
    board[playerChoice] = player;
    console.log(playerChoice)
    player *= -1;
    // changeColor();

    render()

}

// Array.prototype.forEach.call(id, (cell) =>{
//     cell.addEventListener('click', changeColor);
//     cell.style.backgroundColor = 'white';
// })
// function changeColor(e) {
//     let column = e.target.circle.id;
//     let row = [];
//     for ( let i =5; i >-1; i++){
//         if(circle[i].children[column].style.backgroundColor == 'white'){
//             row.push(circle[i].children[column]);
//             if(player === 1) {
//                 row[0].style.backgroundColor = 'red'
//             }
//         }

//     }
//     render();
// }
// based on the mouse click this function adds the current players choice to the board.
function render() {
board.forEach((element, id) => {
    document.getElementById(id).style.backgroundColor = LOOK_UP[element];
   
});

}


initialize()