// =======================REQUIRED===============================
const express= require("express");
const app= express();
const User= require("./models/user");
const mongoose= require("mongoose");
const bcrypt= require("bcrypt");
const session= require('express-session');


// ===================CONNECTING DATABASE========================
mongoose.connect('mongodb+srv://quiz:gbuquiz@quiz.ldhgg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>{
    console.log("mongo connection is done:)");
})
.catch(err=>{
    console.log("connection error!!!");
    console.log(err);
})


app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded( { extended: true} ));
app.use(session({ secret: 'notagoodsecret'}));
// app.use(express.static(path.join(__dirname, '/public')));

// ====================USING MIDDLEWARE==========================
const requirelogin=(req, res, next)=>{
    if(!req.session.user_id){
    return res.redirect('/')
    }
    next();
}


// =====================ROUTES===================================

app.get('/', (req, res)=>{
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
   req.session.user_id=user._id;
    res.redirect('/')

})

app.get('/login', (req,res)=>{
    res.render('login');
})
app.post('/login', async (req, res)=>{
    const {username, password} =req.body;
    const user= await User.findOne({username});
    let currentuser= user.username;
    // res.send(currentuser);
    const validpassword = await bcrypt.compare(password, user.password);
    if(validpassword){
    req.session.user_id=user._id;
    // res.redirect('/')
    res.render('logout.ejs', {currentuser: user.username});
    }
    else{
    res.send('AREY YAAR')
    }
})

app.post('/logout', (req, res)=>{
    req.session.destroy();
    res.redirect('/login')
})

app.get('/secret', requirelogin,(req,res)=>{
    res.render('logout')
})


// =======================Listening App===========================
app.listen(2000,()=>{
    console.log("listening on port 2000!!")
})