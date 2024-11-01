const mongoose = require('mongoose');

const getMonthName = (monthIndex) => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return months[monthIndex];
}

function getSuffix(day) {
    if(day > 3 && day < 21) return 'th';
    switch (day%10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th'
    }
}

const orderSchema = new mongoose.Schema({
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
            required: true
        },
        status: {
        type: String,
        default: 'Placed'
    },
        
    }],
    paymentThrough: {
        type: String,
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    },
    // status: {
    //     type: String,
    //     default: 'Placed'
    // },
    createdAt: {
        type: String,
        default: () => {
            const today = new Date();
            const day = today.getDate();
            const month = getMonthName(today.getMonth());
            const year = today.getFullYear();

            return `${day}${getSuffix(day)} ${month} ${year}`
        }   
    }
})

module.exports = mongoose.model('Orders', orderSchema)