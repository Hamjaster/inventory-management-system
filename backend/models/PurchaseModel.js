const mongoose = require('mongoose')

const purchaseSchema = new mongoose.Schema({

    product: {
        required: true,
        type: mongoose.Schema.ObjectId,
        ref: 'Product'
    },

    category: String,

    purchaseDate: {
        type: Date,
        default: Date.now()
    },

    supplier: {
        required: true,
        type: mongoose.Schema.ObjectId,
        ref: "Supplier"
    },

    qty: {
        type: Number,
        required: true
    },

    totalPrice: {
        type: Number,
        required: true
    }


})

const Purchase = mongoose.model('Purchase', purchaseSchema)


module.exports = Purchase