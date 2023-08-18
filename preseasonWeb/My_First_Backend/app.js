const express = require("express");

const app = express();

const port = 8080;

 const basicAuth = require('express-basic-auth')


console.log("server running")

//get on Frank's songs
app.get("/", (req,res) =>{
  //created an array of his different songs
   const songs = ["My Way", "Strangers in the Night", "That's Life", "New York, New York", "The World We Knew", "Strangers In The Night", "Fly Me to the Moon", "It's Been A Long, Long Time "];

   //generated a random number from 0 to the lenght of the array to be used as index to display a title from the list
     var number = Math.floor(Math.random() * (songs.length - 1) ) + 1;
   

     //send the response using the random number as an index from the array
   res.send(songs[number]);

   //End the response 
   res.end();
})

//get on birth date
app.get("/birth_date", (req,res) => {

//create a new date object using with the date of the musician
  const birth_date = "December 12, 1915";

  //convert the date to a readable string format and send the response
  res.send(birth_date);
  res.end();
})

//get on birth city
app.get("/birth_city", (req,res) => {

  const birth_city = "Hoboken, New Jersey.";
  res.send(birth_city);
  res.end();
})

//get on wives
app.get("/wives", (req, res) =>{
    const wifes = "Nancy Barbato, Ava Gardner, Mia Farrow, Barbara Marx";
    res.send(wifes);
    res.end();
})

//get on picture
app.get("/picture", (req,res)=> {
  res.redirect("https://en.wikipedia.org/wiki/Frank_Sinatra#/media/File:Frank_Sinatra2,_Pal_Joey.jpg")
  res.end();
})
//get on public
app.get("/public", (req,res) => {
  res.send("Everybody can see this page");
  res.end();
})


app.use(basicAuth({
  users: { 
      'admin': 'admin'
    },
 unauthorizedResponse: { 
    status: 401,
    message : "Not authorized"
   }
}))

//get on protected
app.get("/protected", (req,res) => {

    res.status(200);
    res.send("Welcome, authenticated client");
  
})

app.listen(port, () =>{
    console.log("the server is listening at port:", port)
});