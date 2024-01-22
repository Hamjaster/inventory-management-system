const mongoose = require('mongoose')


const connectDB = async () => {
    try {
        const connection = await mongoose.connect("mongodb+srv://hamzashahdev:DMZmXIxpnfCEApEF@skysolar.eimsb1b.mongodb.net/?retryWrites=true&w=majority")

        console.log('MongoDB connected', connection.connection.host);

    } catch (error) {
        console.log('MongoDB not connected', error);
    }
}




module.exports = connectDB;