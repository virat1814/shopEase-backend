const express = require('express');
const router = express.Router();
const multer = require('multer')
const {
    addProduct,
    getProductsByVendor,
    getAllProducts,
    updateProduct,
    deleteProduct
} = require('../controllers/productController');

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads'), //directory where images are stored
    filename: (req, file, cb) => {
        const fileExtension = file.originalname.split('.').pop()
        cb(null, file.originalname); //unique file name
    } 
})

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png/;
        const fileExtension = file.originalname.split('.').pop()
        const extname = fileTypes.test(fileExtension.toLowerCase());
        const mimeType = fileTypes.test(file.mimetype);

        if(mimeType && extname) {
            return cb(null, true)
        } else{
            cb(new Error('Images only!'))
        }
    }
})

router.post('/add', upload.single('image'), addProduct);
router.get('/', getProductsByVendor);
router.get('/all', getAllProducts);
router.put('/:id', upload.single('image'), updateProduct);
router.delete('/:id', deleteProduct)

module.exports = router;