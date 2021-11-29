const express=require("express");
const mongoose=require("mongoose");

const connect=()=>{
    return mongoose.connect(" mongodb://127.0.0.1:27017/data");
}

const compSchema=new mongoose.Schema({
        Company_Name:{type:String,required:true},
        Empnum:{type:Number,required:true},
        Opening_Jobs:{type:Number, required:true},
        comp_optCost:{type:Number, required:true},
},
{
  versionKey:false,
  timestamps:true,
}
)

const Comp=mongoose.model("comp",compSchema);


const jobSchema=new mongoose.Schema({
    Skill:{type:String, required:true},
    City:{type:String, required:true},
    Work_From_Home:{type:String, required:true},
    Notice_Period:{type:String,required:true},
    Rating:{type:Number,required:true},

    company_Id:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"comp",
    required:true,
    },
},
{
  versionKey:false,
  timestamps:true,
}
)


const Job=mongoose.model("job",jobSchema);

const app=express();

app.use(express.json());


//COMPANY POST
app.post("/comps",async(req,res)=>{
    try{
       const comp=Comp.create(req.body);
       return res.status(201).send(comp);
    }
    catch(e){
      return res.status(500).json({status:e.message});
    }
})




//JOBS POST
app.post("/jobs",async(req,res)=>{
    try{
       const job=Job.create(req.body);
       return res.status(201).send(job);
    }
    catch(e){
      return res.status(500).json({status:e.message});
    }
})




// 1  GET BY NAME and SKILL
app.get("/jobs/:name/:skill",async(req,res)=>{
    try{
       const jobs=await Job.find({$and:[{City:req.params.name},{Skill:req.params.skill}]}).lean().exec();
       return res.status(201).send(jobs);
    }
    catch(e){
      return res.status(500).json({status:e.message});
    }
})


// 2 ALL Work_From_Home Jobs
app.get("/jobs/Work_From_Home",async(req,res)=>{
    try{
       const jobs=await Job.find({Work_From_Home:{$eq:"Yes"}}).lean().exec();
       return res.status(201).send(jobs);
    }
    catch(e){
      return res.status(500).json({status:e.message});
    }
})


// 3 ALL NOTICE PERIOD ACCEPTABLE JOBS
app.get("/jobs/Notice_Period",async(req,res)=>{
    try{
       const jobs=await Job.find({Notice_Period:{$eq:"Yes"}}).lean().exec();
       return res.status(201).send(jobs);
    }
    catch(e){
      return res.status(500).json({status:e.message});
    }
})

// 4(a) SORTING JOBS WITH RATING(low to high)
app.get("/jobs/sortLH",async(req,res)=>{
    try{
       const jobs=await Job.find().sort({Rating:1}).lean().exec();
       return res.status(201).send(jobs);
    }
    catch(e){
      return res.status(500).json({status:e.message});
    }
})


// 4(b) SORTING JOBS WITH RATING(high to low)
app.get("/jobs/sortHL",async(req,res)=>{
    try{
       const jobs=await Job.find().sort({Rating:-1}).lean().exec();
       return res.status(201).send(jobs);
    }
    catch(e){
      return res.status(500).json({status:e.message});
    }
})


// 5 DETAILS OF COMPANY BY NAME
app.get("/comps/:name",async(req,res)=>{
    try{
       const comp=await Comp.find({Company_Name:req.params.name}).lean().exec();
       return res.status(201).send(comp);
    }
    catch(e){
      return res.status(500).json({status:e.message});
    }
})


// 6 COMPANY WITH MOST OPEN JOBS
app.get("/comps/opnjob",async(req,res)=>{
    try{
       const comp=await Comp.find().sort({Opening_Jobs:-1}).limit(1).lean().exec();
       return res.status(201).send(comp);
    }
    catch(e){
      return res.status(500).json({status:e.message});
    }
})



app.listen(4000,async function(){
    await connect();
    console.log("Listening on Port 4000");
})