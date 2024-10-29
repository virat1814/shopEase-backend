const Order = require('../models/orderDetailsModel');

const addOrderDetails = async (req, res) => {
    try {
        const { customerId, products, paymentThrough, totalAmount } = req.body;

        const newOrder = new Order({ customerId, products, paymentThrough, totalAmount })
        await newOrder.save();
        res.status(200).json({ messsage: 'Your Order has been placed successfully', newOrder, status: 200 })

    } catch (error) {
        res.status(500).json({ messsage: error.messsage })
    }
}

const getOrderDetails = async (req, res) => {
    try {
        // console.log(req.params.id)
        const orders = await Order.find().populate({path : 'products.productId', match: {vendorId: req.params.id}}).populate('customerId', 'name phoneNumber email address').lean()
        // console.log(orders)
        if (!orders) {
            res.status(200).json({ message: 'No orders placed', status: 400 })
        }
        const vendorOrders = orders.map(order => {
            const validProducts = order.products.filter(products => products.productId !== null)
            return validProducts.length > 0 ? {...order, products: validProducts} : null
        } ).filter(item => item !== null)
        res.status(200).json({ message: 'Order details Found', vendorOrders, status: 200 })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getInvoiceOfOrder = async (req, res) => {
    try{
        const order = await Order.findById(req.params.id).populate('products.productId').populate("customerId", 'name phoneNumber email address');
        res.status(200).json({message: 'invoice created', order, status: 200})
    } catch(error){
        res.status(500).json({message: error.message})
    }
}

const getCustomerOrders = async (req, res) => {
    const {customerId} = req.query;
    try {
        const orders = await Order.find({customerId}).populate('products.productId');
        if (!orders) {
            res.status(200).json({ message: 'No new orders found', status: 200 })
        }
        res.status(200).json({ message: 'Order details Found', orders, status: 200 })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const updateOrderStatusToConfirmed = async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(req.params.id, { status: 'Confirmed' }, { new: true })
        // console.log(req.params.id)
        // await order.save();
        if(!order) return res.status(400).json({message: 'order not found', status: 400})
        res.status(200).json({message: 'status updated',order, status: 200})
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const updateOrderStatusToShipped = async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(req.params.id, { status: 'Shipped' }, { new: true })
        // await order.save();
        if(!order) return res.status(400).json({message: 'order not found', status: 400})
        res.status(200).json({message: 'order shipped', status: 200})
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const updateOrderStatusToDelivered = async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(req.params.id, { status: 'Delivered' }, { new: true })
        if(!order) return res.status(400).json({message: 'order not found', status: 400})
        res.status(200).json({message: 'order delivered', status: 200})
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = { addOrderDetails, getCustomerOrders, getInvoiceOfOrder, getOrderDetails, updateOrderStatusToShipped, updateOrderStatusToConfirmed, updateOrderStatusToDelivered }