var express = require("express");
var app = express();
var mongoose = require("mongoose");
var ObjectID = require('mongodb').ObjectID;

var db = mongoose.connect("mongodb://localhost:27017/users");

db.connection.on("open",function(err,data){
    console.log("连接成功");
});

var userSchema = new mongoose.Schema({
    firstName:{type:String},
    lastName:{type:String}
},{
    collection:"users"
});

var Model = db.model("users",userSchema);

//创建数据


// Model.create([
// { firstName:"王",lastName:"昭君" },
// { firstName:"西",lastName:"施" },
// { firstName:"貂",lastName:"蝉" },
// { firstName:"杨",lastName:"玉环" }
// ],function(err,doc){
//     console.log(doc);
// });

//处理数据
app.get('/user',function(req,res){
    var act = req.query.act;
    if(act=='get'){
        Model.find({},function(err,doc){
            res.send(doc);
            // console.log(doc);
        });
    }else if(act=='add'){
        Model.create({
            firstName:req.query.firstName,
            lastName:req.query.lastName
        },function(err,doc){
            if(err){
                return console.error(err);
            }
            Model.find({},function(err,doc){
                res.send(doc);
            });
        });
    }else if(act=='remove'){
        Model.remove({_id:new ObjectID(req.query.id)},function(err,doc){
            if(err){
                return console.error(err);
            }
            Model.find({},function(err,doc){
                res.send(doc);
            });
        });
    }else if(act=='edit'){
        Model.update({_id:new ObjectID(req.query.id)},{
            firstName:req.query.firstName,
            lastName:req.query.lastName
        },function(err,doc){
            if(err){
                return console.error(err);
            }
            Model.find({},function(err,doc){
                res.send(doc);
            });
        });
    }
});

//返回页面
app.get('*',function(req,res){
    var path = __dirname + req.path;
    console.log(path);
    res.sendFile(path);
});

app.listen(8000);






