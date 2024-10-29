const Cart = require('../models/cartModel');
const mongoose = require('mongoose')

const addCartItem = async (req, res) => {
    const { customerId, productId, quantity } = req.body
    try {
        let cart = await Cart.findOne({ customerId })
        // console.log(cart)
        if (!cart) {
            cart = new Cart({
                customerId,
                products: [{ productId, quantity }]
            })

        } else {
            const productIndex = cart.products.findIndex((item => item.productId.toString() === productId));

            if (productIndex > -1) {
                cart.products[productIndex].quantity += quantity
            } else {
                cart.products.push({ productId, quantity })
            }
        }
        await cart.save();
        res.status(200).json({ message: 'Product added to cart', status: 200, cart })
    } catch (error) {
        res.status(500).json({ message: error.message, status: 500 })
    }
}

const updateCartItem = async (req, res) => {
    const { customerId, productId, quantity } = req.body
    // console.log(quantity)
    try {
        let cart = await Cart.findOne({ customerId })
        if (!cart) {
            return res.status(400).json({ message: 'Cart not found' })
        }
        const productIndex = cart.products.findIndex((item => item.productId.equals(productId)));
        console.log(productIndex)

        if (productIndex === -1) {
            return res.status(200).json({ message: 'Product not found in the cart', status: 400 })
        }

        if (quantity > 0) {
            cart.products[productIndex].quantity = quantity
            console.log('added')
        } else {
            cart.products.splice(productIndex, 1)
        }

        await cart.save();
        res.status(200).json({ message: 'Cart updated', status: 200, cart })
    } catch (error) {
        res.status(500).json({ message: error.message, status: 500 })
    }
}

const getCartItems = async (req, res) => {
    const { customerId } = req.query;
    // console.log(Cart)
    try {
        const cart = await Cart.findOne({ customerId }).populate('products.productId')
        // console.log(cart)
        if (!cart) {
            return res.status(400).json({ message: 'Cart not found' })
        }
        res.status(200).json({ status: 200, cart })
    } catch (error) {
        res.status(500).json({ message: error.message, status: 500 })
    }
}

const deleteCart = async (req, res) => {
    const { customerId, productId } = req.query
    try {
        let cart = await Cart.findOne({ customerId: customerId })

        if (!cart) {
            return res.status(400).json({ message: 'cart not found' })
        }

        const productIndex = cart.products.findIndex(item => item.productId.equals(productId))
        cart.products.splice(productIndex, 1)


        await cart.save();
        res.status(200).json({ message: 'Product removed from cart', status: 200, cart })
    } catch (error) {
        res.status(500).json({ message: error.message, status: 500 })
    }
}

module.exports = { addCartItem, updateCartItem, getCartItems, deleteCart }