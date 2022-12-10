const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const categorySchema = new Schema({
    categoryName: {
        type: String,
        required: true
    }
})

module.exports = Category = model("category", categorySchema);