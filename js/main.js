/*----- constants -----*/
for (let i = 0; i < 42; i++) {
    let square = document.createElement('div');
    let circle = document.createElement('div');
    circle.id = i;
    //circle.textContent = '';
    square.appendChild(circle);
    document.getElementById('container').appendChild(square);
}






//This will help with finding a winner in the game
const GRID_WIDTH = 7;

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

/*----- cached element references -----*/


/*----- event listeners -----*/
//onmouse click add player chip to slot and also makes the next players turn be set.
document.getElementById('container').addEventListener('click', evt => {
    console.log(evt.target.id);
    board[evt.target.id] = player;
    player *= -1;
    render();
})

/*----- functions -----*/
//this sets the board entire board to null so players can choose their slots
//and makes player 1 go first and finally renders the game.
function initialize() {
    board = new Array(42).fill(null);
    player = 1;
    render()

    render()
}
function update() {

}
// based on the mouse click this function adds the current players choice to the board.
function render() {
board.forEach((element, id) => {
    document.getElementById(id).style.backgroundColor = LOOK_UP[element]
   
})

}


initialize()