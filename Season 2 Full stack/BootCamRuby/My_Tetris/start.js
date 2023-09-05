var can = document.getElementById("console");//calling canvas by id name you put
var con = can.getContext("2d");// Here you are creating a 2d context some sort of board where you will draw your game and it
con.scale(30,30);//this is the size of a block that your drawing board will have similar to what you called blocks in your js code
r = 40// rows and columns your board will have from the exercise 
c = 10
function Board(){
    //creating space that will be filled with color to get a realistic board
    let space = [];
    for(let i = 0; i < ROWS; i++){
         space.push([]);
        for(let j = 0; j < COLUMNS; j++){
            space[i].push(0);
        }
    }
    //now filling the space with the color 
    for(let i = 0; i < space.length; i++){
        for(let j = 0; j < space[i].length; j++){
            con.fillStyle =  "#402BE2";// telling the canvas which color to fill parts f the pieces with
            con.fillRect(j,i, 1, 1);//now filling the apce with the color 
        }
    } 
}

Board()
