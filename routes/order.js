const express = require('express');
const router = express.Router();
const {addOrderDetails, getCustomerOrders,getInvoiceOfOrder, getOrderDetails, updateOrderStatusToConfirmed, updateOrderStatusToDelivered, updateOrderStatusToShipped} = require('../controllers/orderController')

router.post('/add', addOrderDetails);
router.get('/', getCustomerOrders);
router.get('/:id', getOrderDetails)
router.get('/invoice/:id', getInvoiceOfOrder)
router.put('/confirmOrder', updateOrderStatusToConfirmed)
router.put('/shipped', updateOrderStatusToShipped)
router.put('/delivered', updateOrderStatusToDelivered)

module.exports = router