const bodyParser = require("body-parser");
const express = require("express")
const app = express()
app.use(express.urlencoded({extended: true}))
const MongoClient = require('mongodb').MongoClient;


var db;
MongoClient.connect('mongodb+srv://jiui4691:5G6jmgAHJtsJshHV@cluster0.komdm2b.mongodb.net/?retryWrites=true&w=majority'
,function(error, client){

    if(error){return console.log(error);} //error catch
    db = client.db('todoapp'); //connect to DB named 'todoapp'
//save data: example
    // db.collection('post').insertOne({Name: 'John', Age: 20 , _id:100},function(error,result){
    //     console.log("save completed");
    // }); 

    app.listen(3000, function(){
        console.log("Server run");
    })
})

app.get("/", function(req,res){
    res.sendFile(__dirname + "/index.html");
})

app.get("/write", function(req,res){
    res.sendFile(__dirname +"/write.html");
})


app.post('/add',function(req,res){
    res.send("sended");
    var todo = req.body.todo;
    var date = req.body.date;
    var detail = req.body.detail;
    db.collection('post').insertOne( {Title:todo, Date:date, Detail:detail} , function(){
        console.log("Saved");
    });
})

