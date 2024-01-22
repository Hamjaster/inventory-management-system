const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },

    category: String,

    price: {
        type: Number,
        required: true
    },

    stock: {
        type: Number,
        required: true
    }


})

const Product = mongoose.model('Product', productSchema)

module.exports = Product