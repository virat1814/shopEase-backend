const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Orders",
        required: true
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
        required: true
    },
    products: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Products",
            required: true
        },
        quantity: {
            type: Number,
            default: 1
        }
    }]
    // status: {
    //     type: String,
    //     default: 'pending'
    // },
}, {timestamps: true})

module.exports = mongoose.model('Invoice', invoiceSchema)