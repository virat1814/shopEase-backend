const Invoice = require('../models/invoiceModel');

const addInvoice = async(req, res) => {
    const {orderId, customerId, productId, quantity} = req.body;
    // console.log(orderId, customerId, productId)
    try{
        const invoice = new Invoice({orderId, customerId, products: [{ productId, quantity }]});
        await invoice.save();

        const populatedInvoices = await Invoice.findById(invoice._id)
            .populate('orderId', 'totalAmount createdAt paymentThrough')
            .populate('customerId', 'name phoneNumber email address')
            .populate('products.productId', 'name price')
            // .populate('orderId.products', 'quantity')
        res.status(200).json({message: 'invoice added successfully', populatedInvoices})
    } catch(error) {
        res.status(500).json({message: error.message, status: 500})
    }
}

const getInvoice = async(req, res) => {
    try{
        const invoice = await Invoice.findById(req.params.id);
        if(!invoice) return res.status(200).json({message: 'No invoice found!', status: 200})
        
        res.status(200).json(invoice)
    } catch(error){
        res.status(500).json({message: error.message, status: 500})
    }
}

const getAllInvoices = async(req, res) => {
    try{
        const invoice = await Invoice.find();
        res.status(200).json(invoice)
    } catch(error){
        res.status(500).json({message: error.message, status: 500})
    }
}

const updateInvoice = async(req, res) => {
    const {status, totalAmount} = req.body;
    try{
        const invoice = await Invoice.findByIdAndUpdate(req.params.id, {status, totalAmount}, {new: true});
        if(!invoice) return res.status(200).json({message: 'No invoice found!', status: 200})
        
        res.status(200).json(invoice)
    } catch(error){
        res.status(500).json({message: error.message, status: 500})
    }
}

module.exports = {addInvoice, getInvoice, getAllInvoices, updateInvoice}