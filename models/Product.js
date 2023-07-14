const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    img: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    rating:{type:Number,required:true},
    brand: { type: String, required: true }
});

module.exports = mongoose.model("product", productSchema);
