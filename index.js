// =======================REQUIRED===============================
const express= require("express");
const app= express();
const User= require("./models/user");
const mongoose= require("mongoose");
const bcrypt= require("bcrypt");


// ===================CONNECTING DATABASE========================
mongoose.connect('mongodb://localhost:27017/userdb', { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>{
    console.log("mongo connection is done:)");
})
.catch(err=>{
    console.log("connection error!!!");
    console.log(err);
})


app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded( { extended: true} ));



// =====================ROUTES===================================

app.get('/', (req,res)=>{
    res.send('This is home page');
})


app.get('/landing', (req, res)=>{
    res.render('landing');
})

app.get('/register', (req,res)=>{
    res.render('register');
})

app.post('/register', async (req, res)=>{
    const {password,username}= req.body;
    const hash_pw= await bcrypt.hash(password, 12);
    const user= new User({
        username,
        password: hash_pw
      })
   await user.save();
    res.redirect('/')

})

app.get('/login', (req,res)=>{
    res.render('login');
})




// =======================Listening App===========================
app.listen(2000,()=>{
    console.log("listening on port 2000!!")
})