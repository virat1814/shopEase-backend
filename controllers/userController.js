const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const transporter = require('../config/mailer')
require('dotenv').config()

const signup = async(req, res) => {
    const {name, email, phoneNumber, password, businessName, businessType, location} = req.body;

    try{
        //finding if any user exist with email stored in database
        const userExist = await User.findOne({email})
        if(userExist){
            return res.status(200).json({message: 'User already exist', status: 200})
        }

        //hashing the password using bcrypt
        const hashedPassword = await bcrypt.hash(password, 8)

        //saving the new user to db
        const newUser = new User({
            name: name,
            email: email,
            phoneNumber: phoneNumber,
            // username: username,
            password: hashedPassword,
            businessName: businessName,
            businessType: businessType,
            location: location
        })
        await newUser.save();

        //sending email
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Welcome to ShopEase',
            html:  `<p>Dear ${name},</p>
                    <p>Thank you for registering with us. We are excited to onboard you.</p>
                    <p>Best regards,<br\>
                    <b>ShopEase</b></p> `
        }
        transporter.sendMail(mailOptions, (error, info) => {
            if(error){
                console.log('error sending email')
            } else{
                console.log('email sent successfully', info.response)
            }
        })


        res.status(200).json({message: 'Registered Successfully and email sent', newUser, status: 200})

    } catch(error){
        console.log('error in registration: ', error)
        res.status(500).json({message: 'Registration failed', status: 500})
    }
}

module.exports = {signup};