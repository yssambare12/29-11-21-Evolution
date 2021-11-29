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
        },
        job_id : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "job",
            required : true,
        },
    },
    {
        versionKey : false,
        timestamps: true,
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
        const user = await User.create(req.body);
        return res.status(201).send(user);
    } catch(e) {
        return res.status(500).json({message,status: "Failed"});
    }
});

app.get("/users", async (req, res) => {
    try {
        const user = await User.find().lean().exec();
        return res.status({user});
    } catch(e) {
        return res.status(500).json({message,status: "Failed"});
    }
});


app.get("/users\id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id).lean().exec();
        return res.send(user);
    } catch(e) {
        return res.status(500).json({message,status: "Failed"});
    }
});

app.patch("/users/id", async (req, res) => {
    try {
        const user = await User.findByIdOrUpdate(req.params.id, req.body, {
            new: true, }).lean().exex();
        return res.status(201).send(user);
    } catch(e) {
        return res.status(500).json({message,status: "Failed"});
    }
});

app.delete("/users/id", async (req, res) => {
    try {
        const user = await User.findByIdOrDelete(req.params.id).lean().exex();
        return res.status(201).send(user);
    } catch(e) {
        return res.status(500).json({message,status: "Failed"});
    }
});


