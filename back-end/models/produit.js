
const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const { ObjectId } = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    qty: {
        type: Number,
        required: true
    },
    image: {
        type: String
    },
    like: {
        type: Number,
        default: 0
    },
    desc: String,
    categorie: String,
    
})

module.exports = Product = model("produit", productSchema);