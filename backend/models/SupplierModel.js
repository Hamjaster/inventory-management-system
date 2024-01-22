const mongoose = require('mongoose')

const supplierSchema = new mongoose.Schema({
    name: String,
    phone: Number,
    address: String
})

const Supplier = mongoose.model('Supplier', supplierSchema)

module.exports = Supplier