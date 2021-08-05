const express=require('express');
const body=require('body-parser');
const cors=require('cors')


     
const app=express();
app.use(cors());

app.use(express.urlencoded({extended : true}));

app.use(body.json())
app.use(require('./routes/api'));


app.listen(process.env.port || 4000,function(){
     console.log("listening..");
});