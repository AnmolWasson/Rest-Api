

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Products = require('../RestApi/models/products'); //collection


mongoose.connect('mongodb://127.0.0.1:27017/Sample',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(()=>{
    console.log('connected to mongodb');
  }).catch((err)=>{
    console.log(err);
  });
const app = express();

const port= process.env.PORT||3000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
// creating an api 


// 1 create a collection ==> and when some one will go to this api ==> uss collection me product 
// create ho jye gi and document add ho jye ga .
app.post('/api/v1/products',async (req,res)=>{
      
    // creating the product ==> of the specified schema
    const prd = await Products.create(req.body);

    res.status(201).json({
          success: true,
          prd
    });
});



// read product 
app.get('/api/v1/products',async (req,res)=>{
     
    const pd = await Products.find();
    res.status(200).json({
        success:true,
        pd
    });
});


// update product

// the id we will fetch from the frontend
// so we will create the udate code such that when 
// ever someone clicks on the update btn in the url the link with the specific id will get open 

app.put('/api/v1/products/:id',async (req,res)=>{

let pd =await Products.findById(req.params.id);
if(!pd) return res.status(500).json({success:false,menubar:"Product not found"});

// (jo update krna hai ,  jiss se update krna hai)
pd = await Products.findByIdAndUpdate(req.params.id,req.body,{new:true,useFindModify:false,runValidators:true});


res.status(200).json({success:true,data:pd});

}); 

// Delete product

app.delete('/api/v1/products/:id',async (req,res)=>{
     
    let pd =await Products.findByIdAndDelete(req.params.id);
    // if(!pd) return res.status(500).json({success:false,menubar:"Product not found"});
//    await  pd.remove();

    res.status(200).json({success:true,data:pd});
});


app.listen(port,() =>{
 console.log("listening on port = '${port}");
});