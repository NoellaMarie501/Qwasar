const down = ["ArrowDown","2"];
const left = ["ArrowLeft","4"];
const right = ["ArrowRight","6"];
const counterclockwise = ["z","3","7","Z"]
const clockwise = ["b","1","9","5","ArrowUp","X","x","B"]
const Hardrop = [" ","8"]
const hold = ["0"]
const pause = ["escape","F1"]
//Game properties score,liness, level
    var gameScore = 0;
    var completeLines = 0;
    var gameLevel = 1;
    var speed = 500
   
    
   // var gameScore = 0

//constants holding the various tetrimino shapes
const SHAPES = [
    [
        [0,1,0,0],
        [0,1,0,0],
        [0,1,0,0],
        [0,1,0,0]
    ],
    [
         [1,1,0],
         [0,1,1],
         [0,0,0]
    ],
    [
        [0,1,1],
        [1,1,0],
        [0,0,0]
    ],
    [
        [0,1,0],
        [0,1,0],
        [1,1,0]
    ],
    [
        [0,1,0],
        [0,1,0],
        [0,1,1]
    ],
    [   
        [0,0,0],
        [0,1,0],
        [1,1,1]
    ],
    [
        [1,1],
        [1,1]

    ]
];
//constant holding the various colors of the tetrimino shapes
const COLORS = [
    "#402BE2",
    '#00FFFF',
    '#FF0000', 
    '#008000', 
    '#0000FF',
    '#FFA500', 
    '#800080', 
    '#FFFF00'
];

//rows and columns of the game board
const ROWS = 40;
const COLUMNS = 10;
const VISIBLE_ROWS = 20;

let canvas = document.querySelector(".tetris");//calling canvas by class name
var score = document.querySelector("#score");
let lines = document.querySelector("#lines");
let level = document.querySelector("#level");
let context = canvas.getContext("2d");//to be able to edit or draw in the canvas

context.scale(30,30);// this is the size of each block(pixel) in the canvas. note the height in the html page is calculated rows(visible)*block_size and width in the html page is calculated columns*block_size

let pieceObject = null// will hold our piece with it's properties
let grid = generateBlankGrid();// holds the entire grid surface

//Function to generate a random block representing the trtis pieces
function generateRandomPiece(){
    let random = Math.floor(Math.random()*7);
    let piece = SHAPES[random];
    let colorIndex = random+1;// because there is the first color which is the background color
    let x_coordinate;
    if(random == 0 || random == 6){
         x_coordinate = 3;
    }
    else{
        x_coordinate = Math.floor(Math.random()*6);
    }// or any number since we want our pieces to come done at the middle of the canvas display
    let y_coordinate = 0;
    pieceObject = {piece, colorIndex, x_coordinate, y_coordinate};//full details of the piece

    return pieceObject;
    //console.log(SHAPES[random]);
}

// Function to render the piece to the canvas screen
function renderPiece(){
    let piece = pieceObject.piece;
    for(let i = 0; i < piece.length; i++){
        for(let j = 0; j < piece[i].length; j++){
            if(piece[i][j] == 1){
                context.fillStyle = COLORS[pieceObject.colorIndex];// telling the canvas which color to fill parts f the pieces with
                context.fillRect(pieceObject.x_coordinate+j, pieceObject.y_coordinate+i, 1, 1);
            }
            
        }
    }
}

//function to move downwards
function moveDown(){
    if(!pieceAtEdge(pieceObject.x_coordinate, pieceObject.y_coordinate + 1)){
        pieceObject.y_coordinate++;
    }
    else{
        for(let i = 0; i < pieceObject.piece.length; i++){
            for(let j = 0; j < pieceObject.piece[i].length; j++){
                if(pieceObject.piece[i][j] == 1){
                    p = pieceObject.x_coordinate + j;
                    q = pieceObject.y_coordinate + i;
                    grid[q][p] = pieceObject.colorIndex;
                }
            }
        }
        gameScore++;
        if(pieceObject.y_coordinate == 0){
            alert("Game over");
            grid = generateBlankGrid()//clearing the board to start over
            gameScore = 0;
            completeLines = 0;
            gameLevel = 1
            clearInterval(intervalid);
            intervalid = setInterval(gameLogic,speed);
        }
        pieceObject = null;
    }
    renderBlankGrid();
}

//function to move left
function moveLeft(){
    if(!pieceAtEdge(pieceObject.x_coordinate - 1, pieceObject.y_coordinate)){
        pieceObject.x_coordinate--;
    }
    renderBlankGrid();
}

//function to move right
function moveRight(){
    if(!pieceAtEdge( pieceObject.x_coordinate + 1, pieceObject.y_coordinate)){
        pieceObject.x_coordinate++;
    } 
    renderBlankGrid();
}

// Function to perform a hard drop
function hardDrop() {
    let newY = pieceObject.y_coordinate; 
  
    while (!pieceAtEdge(pieceObject.x_coordinate, newY + 1)) {
        newY++;
    }
    pieceObject.y_coordinate = newY;
    renderBlankGrid();
}


    
//Functions to rotateClockwise a peice
    function rotateCounterclockwise() {
        let piece = pieceObject.piece;
        const rows = piece.length;
        const cols = piece[0].length;
      //reversing piece
        for(let i = 0; i < piece.length; i++) {
            piece[i] = piece[i].reverse();
        }
        //transposing reversed piece
        var transposedPiece = [];
        for (let j = 0; j < cols; j++) {
          transposedPiece[j] = [];
          for (let i = 0; i < rows; i++) {
            transposedPiece[j][i] = piece[i][j];
          }
        }
        
        if(!pieceAtEdge(pieceObject.x_coordinate, pieceObject.y_coordinate, transposedPiece)){
            pieceObject.piece = transposedPiece;
        }
        
        renderBlankGrid();
        return transposedPiece; 
      }
      
//Functions to rotateClockwise a peice
function rotateClockwise() {
    let piece = pieceObject.piece;
    const rows = piece.length;
    const cols = piece[0].length;
    //Creating the transpose of the matrix
    var transposedPiece = [];
    for (let j = 0; j < cols; j++) {
      transposedPiece[j] = [];
      for (let i = 0; i < rows; i++) {
        transposedPiece[j][i] = piece[i][j];
      }
    }
    //reversing transposed piece
    for(let i = 0; i < transposedPiece.length; i++) {
        transposedPiece[i] = transposedPiece[i].reverse();
    }
    
    if(!pieceAtEdge(pieceObject.x_coordinate, pieceObject.y_coordinate, transposedPiece)){
        pieceObject.piece = transposedPiece;
    }
    
    renderBlankGrid();
    return transposedPiece;
  }
  


//Funtion to create a blank grid(to paint with the backgroud color) with the rows and columns
function generateBlankGrid(){
    let grid = [];
    for(let i = 0; i < ROWS; i++){
         grid.push([]);
        for(let j = 0; j < COLUMNS; j++){
            grid[i].push(0);
        }
    }
    return grid;
}

//Function to render the grid and give a blank effect
function renderBlankGrid(){
    for(let i = 0; i < grid.length; i++){
        for(let j = 0; j < grid[i].length; j++){
            context.fillStyle = COLORS[grid[i][j]];// telling the canvas which color to fill parts f the pieces with
            context.fillRect(j,i, 1, 1);
        }
    }
    renderPiece();
}

//function to check if pice at edge
function pieceAtEdge(x_coordinate, y_coordinate, transposedPiece){
    let piece = transposedPiece || pieceObject.piece;
    for(let i = 0; i < piece.length; i++){
        for(let j = 0; j < piece[i].length; j++){
            if(piece[i][j] == 1){
                let edge = x_coordinate + j;
                let buttom = y_coordinate + i;
                if(edge >=0 && edge < COLUMNS && buttom >= 0 && buttom < VISIBLE_ROWS){
                    if(grid[buttom][edge] > 0){
                        return true;
                    }
                }
                else{
                    return true;
                }
            }
        }
    }
    return false;
}

//Checking if there is a complete row
function completeRow(){
    var count = 0;
    for (let i = 0; i < grid.length; i++){
        let completeRow = true;
        for(j = 0; j < grid[i].length; j++){
            if(grid[i][j] == 0){
                completeRow = false;//if there is a 0 means no complete row
            }
        }
       
        if(completeRow){
            grid.splice(i, 1);//remove that row
            grid.unshift([0,0,0,0,0,0,0,0,0,0]);//and add an empty row at the top
            count++;
            completeLines++;
        }
    }
    //displaying score
    if(count == 1){
      gameScore += (count * 10);
    }
    else if(count == 2){
        gameScore += ((count+1) * 10);
    }
    else if(count >= 3 && count <= 5){
        gameScore += ((count+2) * 10);
    }
    else if(count > 5){
        gameScore += ((count+3) * 10);
    }

    lines.innerHTML = completeLines.toString();
    score.innerHTML = gameScore.toString();

    //displaying levels
    if(gameScore <= 10 ){
        gameLevel = 1;
    }
    else if(gameScore > 10 && gameScore <= 100){
        gameLevel = 2;
    }
    else if(gameScore > 100 && gameScore <= 500){
        gameLevel = 3;
    }
    else if(gameScore > 500 && gameScore <= 1000){
        gameLevel = 4;
    }
    else {
        gameLevel = 5;
    }
    level.innerHTML = gameLevel.toString();
    return gameLevel
    
}

  //Game logic
function gameLogic(){
    completeRow();
    if(pieceObject == null){
         pieceObject = generateRandomPiece();
         renderPiece();
    } 
    moveDown();
    // Adjust speed based on game level
    switch (gameLevel) {
        case 1:
        speed = 500;
        break;
        case 2:
        speed = 400;
        break;
        case 3:
        speed = 300;
        break;
        case 4:
        speed = 200;
        break;
        case 5:
        speed = 100;
        break;
        default:
        speed = 500;
        break;
    }
   
}
let intervalid
//Function to start the Game
function start(){ 
    intervalid = setInterval(gameLogic, speed);
    console.log("speed: ",  speed);
    //DEtecting pressed key
    document.onkeydown = function(event) {
        key = event.key
        console.log("Key pressed: " + key);
        if((event.shiftKey && (key == 'C' || key == 'C')) || hold.includes(key)) {
            console.log("Key pressed: " + key);
            clearInterval(intervalid);
        }
        if(down.includes(key)) {
            console.log("Key pressed: " + key);
            moveDown(); 
        }
        if(left.includes(key)) {
            console.log("Key pressed: " + key);
            moveLeft(); 
        }
        if(right.includes(key)) {
            console.log("Key pressed: " + key);
            moveRight(); 
        }
        if(clockwise.includes(key)) {
            console.log("Key pressed: " + key);
            rotateClockwise(); 
        }
        if(event.ctrlKey && counterclockwise.includes(key) || counterclockwise.includes(key)){
            console.log("Key pressed: " + key);
            rotateCounterclockwise(); 
        }
        if(Hardrop.includes(key)) {
            console.log("Key pressed: " + key);
            hardDrop();
            clearInterval(intervalid);
            
        }
    }
}

