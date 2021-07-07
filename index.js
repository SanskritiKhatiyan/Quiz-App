// REQUIRED
const express= require("express");
const app= express();
const User= require("./models/user");

app.set('view engine', 'ejs');
app.set('views', 'views');

app.get('/register', (req,res)=>{
    res.render('register');
})




// Listening App
app.listen(2000,()=>{
    console.log("listening on port 2000!!")
})