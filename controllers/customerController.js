const Customer = require('../models/customerModel');
const bcrypt = require('bcrypt');

//add customer details
const customerSignup = async(req, res) => {
    const {name, phoneNumber, email, address, password} = req.body;
    try{
        //finding if any user exist with email stored in database
        const userExist = await Customer.findOne({email})
        if(userExist){
            return res.status(200).json({message: 'User already exist', status: 400})
        }

        //hashing the password using bcrypt
        const hashedPassword = await bcrypt.hash(password, 8)

        const customer = new Customer({
            name: name, 
            phoneNumber: phoneNumber,
            email: email,
            password: hashedPassword,
            address : address
        })
        await customer.save();
        res.status(200).json({message: 'Registered successfully', customer, status: 200})
    } catch(error){
        res.status(500).json({message: error.message, status: 500})
    }
}

const customerLogin = async(req, res) => {
    const {email, password} = req.body;
    try{
        //checking if login user email exist in db
        const userExist = await Customer.findOne({email});

        if(!userExist){
            return res.status(200).json({message: 'User not found!', status: 400})
        }

        //comparing the password with existing password in db
        const isPWDMatched = await bcrypt.compare(password, userExist.password)
        if(!isPWDMatched){
            return res.status(200).json({message: 'invalid credentials', status: 400})
        }

        return res.status(200).json({message: 'Logged in successfully!', userExist, status: 200})

    } catch(error){
        console.log('error in login:', error)
        res.json({message: 'login failed', status: 500})
    }
}

module.exports = {customerLogin, customerSignup}

// //get customer details
// const getCustomerById = async(req, res) => {
//     try{
//         const customer = await Customer.findById(req.params.id);

//         if(!customer) return res.status(400).json({message: 'Customer not found!', status: 400})

//         res.status(200).json(customer)
//     } catch(error){
//         res.status(500).json({message: error.message, status: 500})
//     }
// }

// //update customer details
// const updateCustomer = async(req, res) => {
//     const {name, phoneNumber, email, address} = req.body;
//     try{
//         const customer = await Customer.findByIdAndUpdate(req.params.id, {name, phoneNumber, email, address}, {new: true});

//         if(!customer) return res.status(400).json({message: 'Customer not found!', status: 400})

//         res.status(200).json(customer)
//     } catch(error){
//         res.status(500).json({message: error.message, status: 500})
//     }
// }

// //update customer details
// const deleteCustomer = async(req, res) => {
//     // const {name, phoneNumber, email, address} = req.body;
//     try{
//         const customer = await Customer.findByIdAndDelete(req.params.id);

//         if(!customer) return res.status(400).json({message: 'Customer not found!', status: 400})

//         res.status(200).json({message: 'Customer details deleted successfully'})
//     } catch(error){
//         res.status(500).json({message: error.message, status: 500})
//     }
// }

// module.exports = {addCustomer, getCustomerById, updateCustomer, deleteCustomer}

