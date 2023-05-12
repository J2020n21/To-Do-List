const bodyParser = require("body-parser");
const express = require("express")
const app = express()
app.use(express.urlencoded({extended: true}))

const MongoClient = require('mongodb').MongoClient;
MongoClient.connect('mongodb+srv://jiui4691:5G6jmgAHJtsJshHV@cluster0.komdm2b.mongodb.net/?retryWrites=true&w=majority'
,function(error, client){

    app.listen(3000, function(){
        console.log("Server run");
    })
// if DB connection finished,console.log message executed.
})

app.get("/", function(req,res){
    res.sendFile(__dirname + "/index.html");
})

app.get("/write", function(req,res){
    res.sendFile(__dirname +"/write.html");
})

app.post('/add',function(req,res){
    res.send("sended");
    console.log(req.body.date);
    console.log(req.body.todo);
    console.log(req.body.detail);
})

