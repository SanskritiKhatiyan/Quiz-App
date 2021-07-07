const mongoose= require("mongoose");

const userSchema= new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username cannot be blank']
    },
    passsword: {
        type: String,
        reqiured: [true, 'Password cannot be blank']
    },
})

module.exports= mongoose.model("User", userSchema);
