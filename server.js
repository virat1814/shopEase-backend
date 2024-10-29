const express = require('express');
const connectDB = require('./config/db')
const cors = require('cors')
const app = express();
const path = require('path')

const authRouter = require('./routes/auth')
const productRouter = require('./routes/product')
const customerRouter = require('./routes/customer')
const invoiceRouter = require('./routes/invoice')
const orderRouter = require('./routes/order')
const cartRouter = require('./routes/cart')
const wishlistRouter = require('./routes/wishlist')


connectDB()
app.use(express.json())
app.use(cors())
app.use('/uploads',express.static(path.join(__dirname,  'uploads')))

const corsOptions = {
    origin : 'http://localhost:3000',
    credentials: true,
    optionSuccessStatus: 200
}

app.use(cors(corsOptions))
app.use((req, res, next) => {
    // res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:8000');
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET, POST', 'PUT', 'DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
})

app.use('/vendor', authRouter)
app.use('/products', productRouter)
app.use('/customer', customerRouter)
app.use('/invoice', invoiceRouter)
app.use('/orders', orderRouter)
app.use('/cart', cartRouter)
app.use('/wishlist', wishlistRouter)

app.listen(3002, () => console.log('server running at port 3002'))