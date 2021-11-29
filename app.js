const express = require("express")
const mongoose = require("mongoose")
const connect = () => {
    return mongoose.connect("mongodb://127.0.0.1:27017\library")
};

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
    versionKey:false,
    timestamps:true,
}) ;

const companySchema = new mongoose.Schema(
    {
        company_name : {type:String, required: true},
        openings : {type: Number,required: false},
        user_id : {
            type : mongoose.Schema.Types.ObjectId,
            ref: "user"
            required: true
        },
        job_id : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "job",
            required : true,
        },
    },
    {
        versionKey : false,
        timestamps: true;
    }
);

// starting schema for jobs openings

const jobSearch = new mongoose.mongoose.Schema(
    {
        job_name : {type: String, required: true},
        rating : { type: Number, required: false},
        word_from_home: {type : String, required: true},
        notice_period : {type : String, required: true},
        city : {type : String, required: true},
        skills : {
            type  :mongoose.Schema.Types.ObjectId,
            ref: "skills",
            required: true
        },
    },
    {
        versionKey : false,
        timestamps : true,
    }
);

const Skills = mangoose.model("skills", skillSchema);
const app = express();
app.use(express.json());

// candidate means user crud

app.post("/users", async (req, res) => {
    try {
        constt user = await User.create(req.body);
        return res.status(201).send(user);
    } catch(e) {
        return res.status(500).json({message,status: "Failed"});
    }
});