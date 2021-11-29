const mongoose=require('mongoose')

const jobSchema=new mongoose.Schema({
    Company_name:TCS,
    Empnum:String,
    skill:String,
    Opening_Jobs:String,
    noticeperiod:Number,
    rating:Number,
    Cost:Number

})

const Job=new mongoose.model("Job",jobSchema)

module.exports=Job