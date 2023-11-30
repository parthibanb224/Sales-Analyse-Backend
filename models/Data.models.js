const mongoose = require('mongoose');
const { Schema } = mongoose;

const DataSchema = new Schema({
    id: Number,
    title: String,
    price: Number,
    description: String,
    category: String,
    image: String,
    sold: Boolean,
    dateOfSale: String,
})

module.exports = mongoose.model("Data", DataSchema);