const express=require('express');
const router=express.Router();
const MongoClient = require('mongodb').MongoClient


MongoClient.connect('mongodb+srv://ranjith:ranvi40700@cluster0.cspef.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
  .then(client=>{
      const db=client.db('db')
    
    router.get('/dashboard',function(req,res){
        console.log("hello")
        const fid=db.collection('users')
        fid.find({}).toArray(function (err, response) {
            //console.log('response',response)
            if (!err) {
                res.send({ data: response })
            }
        })
    })

})





module.exports=router;