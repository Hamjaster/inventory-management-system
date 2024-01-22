const express = require('express')
const connectDB = require('./db/connection')
const Purchase = require('./models/PurchaseModel')
const Product = require('./models/ProductModel')
const Sale = require('./models/SalesModal')
const Customer = require('./models/CustomerModel')
const Supplier = require('./models/SupplierModel')
var cors = require('cors')

const app = express()
const port = 3000
connectDB()
app.use(express.json());
app.use(cors())

// Product Endpoint
app.get('/product', async (req, res) => {
    try {
        const fProduct = await Product.find()
        res.send({
            success: true,
            message: fProduct
        })
    } catch (error) {
        res.send({
            success: false,
            message: error
        })
    }
})
app.delete('/product/:id', async (req, res) => {
    const { id } = req.params

    try {
        const fProduct = await Product.findByIdAndDelete(id)
        console.log(fProduct)
        res.send({
            success: true,
            message: fProduct
        })
    } catch (error) {
        res.send({
            success: false,
            message: error
        })
    }
})
app.post('/product', async (req, res) => {
    const { title, category, price, stock } = req.body
    try {
        const productCreated = await Product.create({
            title,
            category,
            price,
            stock
        })
        console.log(productCreated)
        res.send({
            success: true,
            message: productCreated
        })
    } catch (error) {
        console.log(error)
        res.send({
            success: false,
            message: error
        })
    }
})


// Supplier Endpoint
app.get('/supplier', async (req, res) => {
    try {
        const Fsupplier = await Supplier.find()
        res.send({
            success: true,
            message: Fsupplier
        })
    } catch (error) {
        res.send({
            success: false,
            message: error
        })
    }
})
app.delete('/supplier/:id', async (req, res) => {
    const { id } = req.params

    try {
        const Sup = await Supplier.findByIdAndDelete(id)
        console.log(Sup)
        res.send({
            success: true,
            message: Sup
        })
    } catch (error) {
        res.send({
            success: false,
            message: error
        })
    }
})
app.post('/supplier', async (req, res) => {
    const { name, phone, address } = req.body
    try {
        const supplier = await Supplier.create({
            name,
            phone,
            address
        })
        res.send({
            success: true,
            message: "Supplier Added Successfuly"
        })
    } catch (error) {
        res.send({
            success: false,
            message: error
        })
    }
})


// Purchases endpoints
app.get('/purchase', async (req, res) => {
    try {
        const purchases = await Purchase.find().populate('product').populate('supplier')
        res.send({
            success: true,
            message: purchases
        })
    } catch (error) {
        res.send({
            success: false,
            message: error
        })
    }
})
app.post('/purchase', async (req, res) => {
    console.log(req.body)
    // Create a new purchase instance
    const {
        product,
        category,
        supplier,
        qty,
        totalPrice
    } = req.body;

    if (!product || !supplier || !qty) {
        return res.status(400).json({ success: false, message: 'Product, supplier, and qty are required fields.' });
    }

    try {
        // Create a new purchase
        const newPurchase = await Purchase.create({
            product,
            category,
            supplier,
            qty,
            totalPrice
        });

        if (newPurchase) {
            console.log(newPurchase)
            // Increasing the product stock on purchase
            const productToPurchase = await Product.findOneAndUpdate(
                { _id: product },
                { $inc: { stock: qty } },
                { new: true }
            );

            // Update product price with the weighted average cost
            let purchaseUnitPrice = totalPrice / qty;
            productToPurchase.price = (productToPurchase.price + purchaseUnitPrice) / 2

            await productToPurchase.save()

            res.status(201).json({ success: true, message: newPurchase });
        } else {
            res.status(500).json({ success: false, message: "Purchase couldn't create" });
        }
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
})


// Sales endpoints
app.get('/sale', async (req, res) => {
    try {
        const sales = await Sale.find().populate('product')
        res.send({
            success: true,
            message: sales
        })
    } catch (error) {
        res.send({
            success: false,
            message: error
        })
    }
})
app.post('/sale', async (req, res) => {
    console.log(req.body)
    const { product, category, customer, qty, totalPrice } = req.body;

    let productToSell = await Product.findById(product)

    if (productToSell.stock < qty) {
        res.status(500).json({ success: false, message: 'Stock is less than your selling quantity' });
    } else {

        // Decreasing the product stock on sale
        await Product.findOneAndUpdate(
            { _id: product },
            { $inc: { stock: -qty } },
            { new: true }
        );

        try {
            console.log(productToSell.price, totalPrice / qty)
            let costPrice = productToSell.price
            let sellingPrice = totalPrice / qty
            let unitPriceDifference = sellingPrice - costPrice

            // Create a new purchase instance
            const newSale = new Sale({
                product,
                category,
                customer,
                qty,
                totalPrice,
                priceDifference: unitPriceDifference * qty
            });

            // Save the purchase to the database
            await newSale.save();

            // Send a success response
            res.status(201).json({ success: true, message: 'Sale created successfully' });
        } catch (error) {
            // Handle errors
            console.error(error);
            res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
    }


})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
