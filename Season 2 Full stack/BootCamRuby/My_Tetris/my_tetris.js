const down = ["ArrowDown","2"];
const left = ["ArrowLeft","4"];
const right = ["ArrowRight","6"];
const hardrop = ["ArrowUp","8","x","1","9","5"]

//const 
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
        [1,1,1],
        [0,1,0],
        [0,0,0]
    ],
    [
        [1,1],
        [1,1]

    ]
]

const COLORS = [
    "#402BE2",
    "#00FFFF",
    "#000000",
    "#FF0000",
    "#0000FF",
    "#FFA500",
    "#800080",
    "#FFFF00"
]

const ROWS = 40;
const COLUMNS = 10;
const VISIBLE_ROWS = 20;

let canvas = document.querySelector(".tetris");//calling canvas by class name
var score = document.querySelector("#score");
let lines = document.querySelector("#lines");
let level = document.querySelector("#level");
let context = canvas.getContext("2d");//to be able to edit or draw in the canvas

context.scale(30,30);// this is the size of each block(pixel) in the canvas. note the height in the html page is calculated rows(visible)*block_size and width in the html page is calculated columns*block_size

let piece_object = null// will hold our piece with it's properties
let grid = generate_blank_grid()// holds the entire grid surface

//Function to generate a random block representing the trtis pieces
function generateRandomPiece(){
    let random = Math.floor(Math.random()*7);
    let piece = SHAPES[random]
    let colorIndex = random+1// because there is the first color which is the background color
    let x_cordinate = 3// or any number since we want our pieces to come done at the middle of the canvas display
    let y_cordinate = 0
    piece_object = {piece, colorIndex, x_cordinate, y_cordinate}//full details of the piece

    return piece_object
    //console.log(SHAPES[random]);
}

// Function to render the piece to the canvas screen
function renderPiece(){
    let piece = piece_object.piece
    for(let i = 0; i < piece.length; i++){
        for(let j = 0; j < piece[i].length; j++){
            if(piece[i][j] == 1){
                context.fillStyle = COLORS[piece_object.colorIndex];// telling the canvas which color to fill parts f the pieces with
                context.fillRect(piece_object.x_cordinate+j, piece_object.y_cordinate+i, 1, 1);
            }
            
        }
    }
}

//function to move downwards
function move_down(){
    if(!piece_at_edge(piece_object.x_cordinate, piece_object.y_cordinate + 1)){
        piece_object.y_cordinate++;
    }
    else{
        for(let i = 0; i < piece_object.piece.length; i++){
            for(let j = 0; j < piece_object.piece[i].length; j++){
                if(piece_object.piece[i][j] == 1){
                    p = piece_object.x_cordinate + j;
                    q = piece_object.y_cordinate + i;
                    grid[q][p] = piece_object.colorIndex;
                }
            }
        }
        if(piece_object.y_cordinate == 0){
            alert("Game over");
            grid = generate_blank_grid()//clearing the board to start over
        }
        piece_object = null;
    }
    render_blank_Grid()
}

//function to move left
function move_left(){
    if(!piece_at_edge(piece_object.x_cordinate - 1, piece_object.y_cordinate)){
        piece_object.x_cordinate--;
    }
    render_blank_Grid()
}

//function to move right
function move_right(){
    if(!piece_at_edge( piece_object.x_cordinate + 1, piece_object.y_cordinate)){
        piece_object.x_cordinate++;
    } 
    render_blank_Grid()
}

    
//Functions to rotate a peice
    function Rotate() {
        let piece = piece_object.piece
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
        //Reversing the matrix after the transpose
        for(let i = 0; i < transposedPiece.length; i++) {
            transposedPiece[i] = transposedPiece[i].reverse();
        }
        if(!piece_at_edge(piece_object.x_cordinate, piece_object.y_cordinate, transposedPiece)){
            piece_object.piece = transposedPiece
        }
        
        render_blank_Grid()
        return transposedPiece;
      }
     
   
   


//Funtion to create a blank grid(to paint with the backgroud color) with the rows and columns
function generate_blank_grid(){
    let grid = [];
    for(let i = 0; i < ROWS; i++){
         grid.push([]);
        for(let j = 0; j < COLUMNS; j++){
            grid[i].push(0)
        }
    }
    return grid;
}

//Function to render the grid and give a blank effect
function render_blank_Grid(){
    for(let i = 0; i < grid.length; i++){
        for(let j = 0; j < grid[i].length; j++){
            context.fillStyle = COLORS[grid[i][j]]// telling the canvas which color to fill parts f the pieces with
            context.fillRect(j,i, 1, 1);
        }
    }
    renderPiece();
}

//function to check if pice at edge
function piece_at_edge(x_cordinate, y_cordinate, transposedPiece){
    let piece = transposedPiece || piece_object.piece  ;
    for(let i = 0; i < piece.length; i++){
        for(let j = 0; j < piece[i].length; j++){
            if(piece[i][j] == 1){
                let edge = x_cordinate + j;
                let buttom = y_cordinate + i;
                if(edge >=0 && edge < COLUMNS && buttom >= 0 && buttom < VISIBLE_ROWS){
                    if(grid[buttom][edge] != 0){
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
    var count = 0
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
        }
    }
    if(count < 2){
       score.innerHTML = (10 * count).toString();
    }
    else if(count > 2){
        score.innerHTML = (10 * (count + 1)).toString();
    }
}





//Game logic
function game_logic(){
    completeRow();
    if(piece_object == null){
         piece_object = generateRandomPiece();
         renderPiece();
    }
    move_down();
     
}


//Detecting user key pressed
document.onkeydown = function(event) {
    let key = event.key
    if(down.includes(key)) {
        console.log("Key pressed: " + key);
        move_down(); 
    }
    if(left.includes(key)) {
        console.log("Key pressed: " + key);
        move_left(); 
    }
    if(right.includes(key)) {
        console.log("Key pressed: " + key);
        move_right(); 
    }
    if(hardrop.includes(key)) {
        console.log("Key pressed: " + key);
        Rotate(); 
    }

  };
  

setInterval(game_logic,500);


