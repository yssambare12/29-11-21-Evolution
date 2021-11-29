const express = require("express")
const mongoose = require("mongoose")
const app = express()
app.use(express.json())
const connect = () => {
    return mongoose.connect("mongodb://127.0.0.1:22017\library")
}

// schema for Naukri candidate 

const userSchema = new mangoose.Schema({
    first_name : {type :String , require:true},
    first_lastname : {type :String , require:false},
    city : {type :String , require:true},
    word_from_home : {type :String , require:true},
    notice_period : {type :Number , require:true},
    rating : {type :Number , require:true},
    company : {type :Number , require:true}
},{
    versionKey:false
    timestamps:true
}) 

const User = mongoose.model("user", userSchema)

