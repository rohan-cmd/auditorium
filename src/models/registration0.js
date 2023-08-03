const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const adminSchema = new mongoose.Schema({
    uname : {
        type:String,
        required:true,
    },
    mobile : {
        type:Number, 
        required:true,
        unique:true
    },
    email : {
        type:String,
        required:true,
        unique:true
    },
    password : {
        type:String,
        required:true,
    },
    confirm_password : {
        type:String,
        required:true,
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
})

// generating token
adminSchema.methods.generateAuthToken = async function(){
    try {
        // console.log(this._id);
        const token = jwt.sign({_id:this._id.toString()},process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        return token;
    } catch (error) {
        res.send("The error part " + error);
        // console,log("The error part " + error);
    }
}

// calling this function before save() in app.js
adminSchema.pre("save",async function(next){
    if (this.isModified("password")) {
        // const passwordHash = await bcrypt.hash(password, 10);
        // console.log(`password : ${this.password}`);
        this.password = await bcrypt.hash(this.password, 10);
        // console.log(`password : ${this.password}`);
        this.confirm_password = await bcrypt.hash(this.password, 10);
    }
 
    next();
})

// creating collection
const adminRegistration = new mongoose.model("adminRegistration",adminSchema); 
module.exports = adminRegistration;