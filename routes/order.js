const express = require('express');
const router = express.Router();
const {addOrderDetails, getCustomerOrders,getInvoiceOfOrder, getOrderDetails, updateOrderStatusToConfirmed, updateOrderStatusToDelivered, updateOrderStatusToShipped} = require('../controllers/orderController')

router.post('/add', addOrderDetails);
router.get('/', getCustomerOrders);
router.get('/:id', getOrderDetails)
router.get('/invoice/:id', getInvoiceOfOrder)
router.put('/confirmOrder/:id', updateOrderStatusToConfirmed)
router.put('/shipped/:id', updateOrderStatusToShipped)
router.put('/delivered/:id', updateOrderStatusToDelivered)

module.exports = router