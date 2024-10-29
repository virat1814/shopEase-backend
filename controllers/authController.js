const bcrypt = require('bcrypt');
const User = require('../models/userModel');

const login = async(req, res) => {
    const {email, password} = req.body;
    try{
        //checking if login user email exist in db
        const userExist = await User.findOne({email});
        console.log(userExist)
        if(!userExist){
            return res.status(200).json({message: 'User not found!', status: 400})
        }

        //comparing the password with existing password in db
        const isPWDMatched = await bcrypt.compare(password, userExist.password)
        if(!isPWDMatched){
            return res.status(200).json({message: 'invalid credentials', status: 400})
        }

        return res.json({message: 'Logged in successfully!', userExist, status: 200})

    } catch(error){
        console.log('error in login:', error)
        res.json({message: 'login failed', status: 500})
    }
}

module.exports = {login}