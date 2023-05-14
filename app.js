const bodyParser = require("body-parser");
const express = require("express")
const app = express()
app.use(express.urlencoded({extended: true}))
const MongoClient = require('mongodb').MongoClient;
app.set('view engine', 'ejs'); //setting to use ejs


app.use('/public', express.static('public'));


var db;
MongoClient.connect('mongodb+srv://jiui4691:5G6jmgAHJtsJshHV@cluster0.komdm2b.mongodb.net/?retryWrites=true&w=majority'
,function(error, client){

    if(error){return console.log(error);}
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
    res.render('index.ejs');
})

app.get("/write", function(req,res){
    res.sendFile(__dirname +"/write.html");
})

// read "to-do"
app.get("/list",function(req,res){
    
    db.collection('post').find().toArray(function(err,result){
        console.log(result);
        res.render('list.ejs',{posts : result});
    });//get all data. Put it in the ejs file.

})

// create "to-do"
app.post('/add',function(req,res){
    res.send("sended");
    db.collection('counter').findOne({name:"total post"},function(err,result){
        //console.log(result.totalPost);
        var Post = result.totalPost;

        var todo = req.body.todo;
        var date = req.body.date;
        var detail = req.body.detail;
        db.collection('post').insertOne( {_id:Post+1,Title:todo, Date:date, Detail:detail} , function(){
            //console.log("Saved");
            db.collection('counter').updateOne({name:'total post'},{ $inc : {totalPost: 1}},(err,result)=>{
                if(err) return console.log(err)
                //console.log("incremented");
            });
        });
        
    });
});

// delete post
app.delete('/delete',(req,res)=>{
    console.log(res.body); //{_id:'1'}
    parseInt(res.body._id);
    db.collection('post').deleteOne({_id : res.body}, (err,result)=>{
        res.status(200).send({message: 'Success'}); //success
    });
});


//detail page: correspond to url
app.get("/detail/:id",(req,response)=>{
    db.collection('post').findOne({_id:parseInt(req.params.id) },(err,result)=>{
        response.render('detail.ejs', {data : result}); //send data together {name:data}
    });
    
});

//show edit page
app.get("/edit/:id",(req,res)=>{
    db.collection('post').findOne({_id:parseInt(req.params.id) },(err,result)=>{
    res.render('edit.ejs',{post:result});
    });
    // error handling
});