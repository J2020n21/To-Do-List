const express = require("express")
const app = express()
app.use(express.urlencoded({extended: true}))

app.get("/", function(req,res){
    res.sendFile(__dirname + "/index.html");
})

app.get("/write", function(req,res){
    res.sendFile(__dirname +"/write.html");
})


app.listen(3000, function(){
    console.log("Server run");
})