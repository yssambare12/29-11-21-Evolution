const express = require("express")
const mongoose = require("mongoose")
const app = express()
app.use(express.json())
const connect = ()=>{
    return mongoose.connect("mongodb://127.0.0.1:27017/library")
}



//----------------Schema for USER-----------------------------

const userSchema = new mongoose.Schema({
    first_name : {type:String , required:true},
    last_name : {type: String, required: false},
    email: {type: String, required:false},
    gender:{type:String, required:true, default:"Male"},
    age:{type:Number, required:true}
},{
    versionKey:false,
    timestamps:true
})
const User = mongoose.model("user", userSchema)

//------------------- CRUD for user ---------------------------------
app.post("/user", async (req, res)=>{
    try{
        const user = await User.create(req.body)
        return res.status(201).send(user)
    } catch(e){
        return res.status(500).json({message: e.message, status:"Failed"})
    }
})
app.get("/user", async (req, res)=>{
    try{
        const user = await User.find().lean().exec()
        return res.status(201).send(user)
    } catch(e){
        return res.status(500).json({message: e.message, status:"Failed"})
    }
})
app.get("/user/:id", async (req, res)=>{
    try{
        const user = await User.findById(req.params.id).lean().exec()
        return res.status(201).send(user)
    } catch(e){
        return res.status(500).json({message: e.message, status:"Failed"})
    }
})
app.patch("/user/:id", async (req, res)=>{
    try{
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {new:true}).lean().exec()
        return res.status(201).send(user)
    } catch(e){
        return res.status(500).json({message: e.message, status:"Failed"})
    }
})
app.delete("/user/:id", async (req, res)=>{
    try{
        const user = await User.findByIdAndDelete(req.params.id).lean().exec()
        return res.status(201).send(user)
    } catch(e){
        return res.status(500).json({message: e.message, status:"Failed"})
    }
})
//------------------- CRUD for user end ---------------------------------



//------------------- Schema for author ---------------------------------
const authorSchema = new mongoose.Schema({
    book_name:{type:String, required:true},
    author_name:{type:String, required:true},
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"user"
    },
},
    {
        versionKey:false,
        timestamps:true
    }
)
const Author = mongoose.model("author", authorSchema)
//-----------------------CRUM author-------------------
app.post("/author", async (req, res)=>{
    try{
        const user = await Author.create(req.body)
        return res.status(201).send(user)
    } catch(e){
        return res.status(500).json({message: e.message, status:"Failed"})
    }
})
app.get("/author", async (req, res)=>{
    try{
        const user = await Author.find().lean().exec()
        return res.status(201).send(user)
    } catch(e){
        return res.status(500).json({message: e.message, status:"Failed"})
    }
})
app.get("/author/:par", async (req, res)=>{
    try{
        //console.log(req.params.par)
        const user = await Author.find({"author_name":{$eq:req.params.par}}).lean().exec()
        return res.status(201).send({user})
    } catch(e){
        return res.status(500).json({message: e.message, status:"Failed"})
    }
})
app.get("/author/:id/author_name", async (req, res)=>{
    try{
        const user = await Author.findById(req.params.id).lean().exec()
        const user2 = await Author.find(user_ids = user.user_id).lean().exec()
        //use populate(user_id)
        return res.status(201).send({user, user2})
    } catch(e){
        return res.status(500).json({message: e.message, status:"Failed"})
    }
})
app.get("/author/:id", async (req, res)=>{
    try{
        const user = await Author.findById(req.params.id).lean().exec()
        return res.status(201).send(user)
    } catch(e){
        return res.status(500).json({message: e.message, status:"Failed"})
    }
})
app.patch("/author/:id", async (req, res)=>{
    try{
        const user = await Author.findByIdAndUpdate(req.params.id, req.body, {new:true}).lean().exec()
        return res.status(201).send(user)
    } catch(e){
        return res.status(500).json({message: e.message, status:"Failed"})
    }
})
app.delete("/author/:id", async (req, res)=>{
    try{
        const user = await Author.findByIdAndDelete(req.params.id).lean().exec()
        return res.status(201).send(user)
    } catch(e){
        return res.status(500).json({message: e.message, status:"Failed"})
    }
})
//--------------------------------CRUD for author end --------------------------------



//--------------------- Schema For book start --------------------------
const bookSchema = new mongoose.Schema({
    book_name:{type:String, required:true},
    author_name:{type:String, required:true},
    author_id:[{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"author"
    },]
},{
    versionKey:false,
    timestamps:true
})
const Book = mongoose.model("books", bookSchema)
//--------------------- Schema For book end --------------------------
//--------------------- CRUD For book start --------------------------
app.post("/books", async (req, res)=>{
    try{
        const user = await Book.create(req.body)
        return res.status(201).send(user)
    } catch(e){
        return res.status(500).json({message: e.message, status:"Failed"})
    }
})
app.get("/books", async (req, res)=>{
    try{
        const user = await Book.find().lean().exec()
        return res.status(201).send(user)
    } catch(e){
        return res.status(500).json({message: e.message, status:"Failed"})
    }
})
app.get("/books/:par", async (req, res)=>{
    try{
        console.log(req.params.par)
        const user = await Book.find({"author_name":{$eq:req.params.par}}).lean().exec()
        return res.status(201).send(user)
    } catch(e){
        return res.status(500).json({message: e.message, status:"Failed"})
    }
})
app.get("/books/:id", async (req, res)=>{
    try{
        const user = await Book.findById(req.params.id).lean().exec()
        return res.status(201).send(user)
    } catch(e){
        return res.status(500).json({message: e.message, status:"Failed"})
    }
})
app.patch("/books/:id", async (req, res)=>{
    try{
        const user = await Book.findByIdAndUpdate(req.params.id, req.body, {new:true}).lean().exec()
        return res.status(201).send(user)
    } catch(e){
        return res.status(500).json({message: e.message, status:"Failed"})
    }
})
app.delete("/books/:id", async (req, res)=>{
    try{
        const user = await Book.findByIdAndDelete(req.params.id).lean().exec()
        return res.status(201).send(user)
    } catch(e){
        return res.status(500).json({message: e.message, status:"Failed"})
    }
})
//--------------------- CRUD For book end --------------------------





//-----------------------Schema for section ---------------------------------
const sectionSchema = new mongoose.Schema({
    typeOfBook : {type:String , required:true},
    nameofbook:{type:String, required:true},
    status:{type:String, required:false},
    book_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "books"
    },
    author_name:{
        type: String,
        required:true
    }
},{
    versionKey:false,
    timestamps:true
})
const Section = mongoose.model("section", sectionSchema)
//-------------------- CRUD FOR section ---------------------------
app.post("/section", async (req, res)=>{
    try{
        const user = await Section.create(req.body)
        return res.status(201).send(user)
    } catch(e){
        return res.status(500).json({message: e.message, status:"Failed"})
    }
})
app.get("/section", async (req, res)=>{
    try{
        const user = await Section.find().populate("book_id").lean().exec()
        return res.status(201).send(user)
    } catch(e){
        return res.status(500).json({message: e.message, status:"Failed"})
    }
})
app.get("/section/:par", async (req, res)=>{
    try{
        console.log(req.params.par)
        const user = await Section.find({$or: [{"status":{$eq:req.params.par}}, {"author_name":{$eq:req.params.par}}]}).lean().exec()
        return res.status(201).send(user)
    } catch(e){
        return res.status(500).json({message: e.message, status:"Failed"})
    }
})
app.patch("/section/:id", async (req, res)=>{
    try{
        const user = await Section.findByIdAndUpdate(req.params.id, req.body, {new:true}).lean().exec()
        return res.status(201).send(user)
    } catch(e){
        return res.status(500).json({message: e.message, status:"Failed"})
    }
})
app.delete("/section/:id", async (req, res)=>{
    try{
        const user = await Section.findByIdAndDelete(req.params.id).lean().exec()
        return res.status(201).send(user)
    } catch(e){
        return res.status(500).json({message: e.message, status:"Failed"})
    }
})
//--------------------- CRUD For section end --------------------------



//--------------------------------Schema for checkout start --------------------------------
const checkoutSchema = new mongoose.Schema({
    book_name:{
        type:String, required:true
    },
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"user"
    },
    book_id:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"books"
    },
    section_id:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"section"
    }
},{
    versionKey:false,
    timestamps:true
})
const Checkout = mongoose.model("checkout", checkoutSchema)
//--------------------------------Schema for checkout end --------------------------------

//--------------------------------CRUD for checkout start --------------------------------
app.post("/checkout", async (req, res)=>{
    try{
        const user = await Checkout.create(req.body)
        return res.status(201).send(user)
    } catch(e){
        return res.status(500).json({message: e.message, status:"Failed"})
    }
})
app.get("/checkout", async (req, res)=>{
    try{
        const checkedout_books = await Checkout.find().lean().exec()
        return res.status(201).send({checkedout_books})
    } catch(e){
        return res.status(500).json({message: e.message, status:"Failed"})
    }
})
app.get("/checkout/:id", async (req, res)=>{
    try{
        const user = await Checkout.findById(req.params.id).lean().exec()
        return res.status(201).send(user)
    } catch(e){
        return res.status(500).json({message: e.message, status:"Failed"})
    }
})
app.delete("/checkout/:id", async (req, res)=>{
    try{
        const user = await Checkout.findByIdAndDelete(req.params.id).lean().exec()
        return res.status(201).send(user)
    } catch(e){
        return res.status(500).json({message: e.message, status:"Failed"})
    }
})
//--------------------------------CRUD for checkout end --------------------------------


app.listen(2100, async function(){
    await connect()
    console.log("listening on 2100 port")
})