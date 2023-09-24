

const mongoose = require('mongoose');

const productSchema = mongoose.Schema;

// model creation 
const product = new productSchema({
    name: String,
    description: String,
    price: Number,

});


// collection creation 

const pp = new mongoose.model('Product', product);

module.exports =pp;
