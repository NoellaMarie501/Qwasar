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
let context = canvas.getContext("2d");//to be able to edit or draw in the canvas

context.scale(30,30);// this is the size of each block(pixel) in the canvas. note the height in the html page is calculated rows(visible)*block_size and width in the html page is calculated columns*block_size

 let piece_object = null
 let grid = generate_blank_grid()
//Function to generate a random block representing the trtis peices
function generateRandomPiece(){
    let random = Math.floor(Math.random()*7);
    let piece = SHAPES[random]
    let colorIndex = random+1// because there is the first color which is the background color
    let x_cordinate = 3// or any number since we want our peices to come done at the middle of the canvas display
    let y_cordinate = 0
    piece_object = {piece, colorIndex, x_cordinate, y_cordinate}//full details of the peice

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
    piece_object.y_cordinate++;
    renderGrid()
    return piece_object.y_cordinate;
}

//function to move downwards
function move_left(){
    piece_object.x_cordinate--;
    renderGrid()
    return piece_object.x_cordinate;
}



//function to move downwards
function move_right(){
    piece_object.x_cordinate++;
    renderGrid()
    return piece_object.x_cordinate;
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
function renderGrid(){
    for(let i = 0; i < grid.length; i++){
        for(let j = 0; j < grid[i].length; j++){
            context.fillStyle = COLORS[0];// telling the canvas which color to fill parts f the pieces with
            context.fillRect(j,i, 1, 1);
        }
    }
    renderPiece();
}

//Game logic
function game_logic(){
    if(piece_object == null){
         piece_object = generateRandomPiece() 
         renderPiece();
    }
     
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
  };
  

setInterval(game_logic,500);


