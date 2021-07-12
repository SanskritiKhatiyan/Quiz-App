
// =======================REQUIRED===============================
const express= require("express");
const app= express();
const User= require("./models/user");
const mongoose= require("mongoose");
const bcrypt= require("bcrypt");
const session= require('express-session');
const nodemailer= require('nodemailer');
const { getMaxListeners } = require("./models/user");
const path = require('path');

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
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded( { extended: true} ));
app.use(session({ secret: 'notagoodsecret'}));
app.use(express.static(path.join(__dirname, '/public')));

// ====================NODEMAILER===============================


// const transporter= nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//         user: "gbucseproject@gmail.com",
//         pass: "gbucse@121"
//     }
// });

// const options ={
//     from: "gbucseproject@gmail.com" ,
//     to: "cseproject2023@gmail.com",
//     subject: "checking the contact us backend!!!",
//     text: "hi! i m working totally fine."
// };

// transporter.sendMail(options, function(err, info){
//     if(err)
//     console.log("ERROR!!",err);
//     else
//     console.log("Sent: "+ info.response);
// })

// ====================USING MIDDLEWARE==========================
const requirelogin=(req, res, next)=>{
    if(!req.session.user_id){
    return res.redirect('/')
    }
    next();
}


// !!!!!!!!!!!!!!!!!!!!!!!ROUTES!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
app.get('/',function(req, res){
    res.render("landing");
});   

// ===================CONTACT-US=================================
app.get('/contact', function(req, res){
    res.render('contact');
});

// ===================QUIZ PAGES=================================
app.get('/sports', function(req, res){
    res.render('sports');
});
app.get("/dsa", function(req, res){
    res.render("dsa");
});
app.get('/gk', function(req, res){
    res.render('gk');
});
app.get('/cultures', function(req, res){
    res.render('cultures');
});

// ===================LEVEL-1=================================
app.get('/api1', function(req, res){
    res.render('api1');
});
app.get('/api2', function(req, res){
    res.render('api2');
});
app.get('/flag1', function(req, res){
    res.render('flag1');
});
app.get('/manual1', function(req, res){
    res.render('manual1');
});


// ===================REGISTER=================================
app.get('/register',function(req,res){
    res.render('register');
});

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

// ===================LOGIN=================================
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

// ===================LOGOUT=================================
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