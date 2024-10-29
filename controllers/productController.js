const Products = require('../models/productModel')

//adding product details
const addProduct = async(req, res) => {
    const {name, description, price, stock, vendorId} = req.body;
    const imageUrl = req.file ? req.file.path : '';

    try{
        const product = new Products({
            name,
            description,
            price,
            stock,
            imageUrl,
            vendorId
        })
        // console.log(product)

        await product.save();
        res.status(200).json({message: 'Product added successfully', status: 200, product})
    } catch(error){
        res.status(500).json({message: error.message, status: 500})
    }
}

//Get products using vendor id
const getProductsByVendor = async(req, res) => {
    const {vendorId} = req.query;
    try{
        const products = await Products.find({vendorId});
        console.log('******************vendor prod')
        if(!products || products.length === 0) return res.status(200).json({message: 'No products found', status:400});
        const updatedProducts = products.map(product => {
            return{
                ...product._doc,
                imageUrl: product.imageUrl.replace('/\\/g', '/')
            }
        })
        res.status(200).json(updatedProducts)
    } catch(error){
        res.status(500).json({message: error.message})
    }
}

//Get all products
const getAllProducts = async(req, res) => {
    try{
        const products = await Products.find();
        console.log('**************************products for customer')
        const updatedProducts = products.map(product => {
            return{
                ...product._doc,
                imageUrl: product.imageUrl.replace('/\\/g', '/')
            }
        })
        res.status(200).json(updatedProducts)
        // if(!product) return res.status(200).json({message: 'Product not found!', status: 400})
    } catch(error) {
        res.status(500).json({message: error.message, status: 500})
    }
}

//update a product
const updateProduct = async(req, res) => {
    const {name, description, price, stock, vendorId} = req.body;
    const {productId} = req.params;
    try{
        const product = await Products.findById({_id: productId, vendorId});
        // res.status(200).json(product)
        if(!product) {
            return res.status(400).json({message: 'Product not found!', status: 200})
        }

        product.name = name || product.name;
        product.description = description || product.description;
        product.price = price || product.price;
        product.stock = stock || product.stock;
        if(req.file) product.imageUrl = req.file.path;
        product.vendorId = vendorId;
        await product.save();

        const updatedProducts = product.map(prod => {
            return{
                ...prod._doc,
                imageUrl: prod.imageUrl.replace('/\\/g', '/')
            }
        })

        res.status(200).json({message: 'Product updated successfully', updatedProducts})
        
    } catch(error) {
        res.status(500).json({message: error.message, status: 500})
    }
}

//Delete the product using id
const deleteProduct = async(req, res) => {
    try{
        const product = await Products.findByIdAndDelete(req.params.id);
        if(!product) return req.status(200).json({message: 'Product not found', status: 400});
        // const remainingProducts = await products.find();
        res.status(200).json({message: 'Product deleted successfully', status: 200})
    } catch(error){
        res.status(500).json({message: error.message, status: 500})
    }
}

module.exports = {addProduct, getAllProducts, getProductsByVendor, updateProduct, deleteProduct}