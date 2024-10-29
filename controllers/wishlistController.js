const Wishlist = require('../models/wishlistModel');

const addToWishlist = async (req, res) => {
    const { customerId, productId } = req.body;

    try {
        let wishlist = await Wishlist.findOne({ customerId })

        // const productExist = wishlist.products.flatMap(item => item.productId.equals(productId))
        if (!wishlist) {
            wishlist = new Wishlist({
                customerId,
                products: [{productId}]
            })

        } else {
            const productExist = wishlist.products.some(item => item.productId.equals(productId));
            if (productExist) {
                return res.status(200).json({ message: 'Already in wishlist', status: 400 });
            } else {
                wishlist.products.push({ productId });
            }

            
        }
        
        await wishlist.save();
        res.status(200).json({ message: 'Product added to wishlist', status: 200, wishlist })
    } catch (error) {
        res.status(500).json({ message: error.message, status: 500 })
    }
}

const deleteWishlist = async (req, res) => {
    const { customerId, productId } = req.query;
    console.log(customerId)
    try {
        let wishlist = await Wishlist.findOne({ customerId: customerId })
        if (!wishlist) {
            return res.status(400).json({ message: 'Wishlist not found', status: 400 })
        }
    
        const productIndex = wishlist.products.findIndex(item => item.productId.equals(productId))
        wishlist.products.splice(productIndex, 1)


        await wishlist.save();
        res.status(200).json({ message: 'Product removed from wishlist', status: 200, wishlist })
    } catch (error) {
        res.status(500).json({ message: error.message, status: 500 })
    }
}

const getWishlist = async(req, res) => {
    const {customerId} = req.query;
    try{
        const wishlist = await Wishlist.findOne({customerId}).populate('products.productId')
        if (!wishlist) {
            return res.status(400).json({ message: 'Wishlist not found' })
        }
        res.status(200).json({status: 200, wishlist})
    } catch(error){
        res.status(500).json({ message: error.message, status: 500 })
    }
}

module.exports = {addToWishlist, deleteWishlist, getWishlist}