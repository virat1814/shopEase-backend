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
    // const updateStatus = products.status
    const {orderId, productId} = req.body;
    try {
        const order = await Order.findById(orderId)
        console.log(order)
        console.log(productId, orderId)
        // await order.save();
        if(!order) return res.status(400).json({message: 'order not found', status: 400})
        
        const productIndex = order.products.findIndex(item => item.productId.equals(productId))
        if(productIndex === -1) {
            return res.status(200).json({message: 'Product not found in the order', status: 400})
        }
        order.products[productIndex].status = 'Confirmed';
        await order.save();
        res.status(200).json({message: 'status updated',order, status: 200})
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const updateOrderStatusToShipped = async (req, res) => {
    const {orderId, productId} = req.body;
    try {
        const order = await Order.findById(orderId)
        console.log(order)
        console.log(productId, orderId)
        // await order.save();
        if(!order) return res.status(400).json({message: 'order not found', status: 400})
        
        const productIndex = order.products.findIndex(item => item.productId.equals(productId))
        if(productIndex === -1) {
            return res.status(200).json({message: 'Product not found in the order', status: 400})
        }
        order.products[productIndex].status = 'Shipped';
        await order.save();
        res.status(200).json({message: 'status updated',order, status: 200})
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const updateOrderStatusToDelivered = async (req, res) => {
    const {orderId, productId} = req.body;
    try {
        const order = await Order.findById(orderId)
        console.log(order)
        console.log(productId, orderId)
        // await order.save();
        if(!order) return res.status(400).json({message: 'order not found', status: 400})
        
        const productIndex = order.products.findIndex(item => item.productId.equals(productId))
        if(productIndex === -1) {
            return res.status(200).json({message: 'Product not found in the order', status: 400})
        }
        order.products[productIndex].status = 'Delivered';
        await order.save();
        res.status(200).json({message: 'status updated',order, status: 200})
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = { addOrderDetails, getCustomerOrders, getInvoiceOfOrder, getOrderDetails, updateOrderStatusToShipped, updateOrderStatusToConfirmed, updateOrderStatusToDelivered }