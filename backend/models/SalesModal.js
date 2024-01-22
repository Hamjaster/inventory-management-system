const mongoose = require('mongoose')

const salesSchema = new mongoose.Schema({

    product: {
        required: true,
        type: mongoose.Schema.ObjectId,
        ref: 'Product'
    },

    category: String,

    salesDate: {
        type: Date,
        default: Date.now()
    },
    customer: {
        required: true,
        type: String,
    },

    qty: {
        type: Number,
        required: true
    },

    totalPrice: {
        type: Number,
        required: true
    },

    priceDifference: {
        requried: true,
        type: Number
    }


})

const Sale = mongoose.model('Sale', salesSchema)

module.exports = Sale