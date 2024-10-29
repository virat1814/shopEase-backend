const express = require('express');
const router = express.Router();
const {addCartItem, getCartItems, updateCartItem, deleteCart} = require('../controllers/cartController')

router.post('/add', addCartItem)
router.put('/update', updateCartItem)
router.get('/', getCartItems)
router.delete('/', deleteCart)

module.exports = router;