const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
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
}, { timestamps: true })

module.exports = mongoose.model('Cart', cartSchema)