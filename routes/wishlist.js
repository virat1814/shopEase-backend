const express = require('express');
const router = express.Router();
const {addToWishlist, deleteWishlist, getWishlist} = require('../controllers/wishlistController')

router.post('/add', addToWishlist)
router.delete('/', deleteWishlist)
router.get('/', getWishlist)

module.exports = router;