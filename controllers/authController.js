const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const register = async(req,res) => {
   try {
    const {name, email, password} = req.body;
    const user = await User.findOne({email});
    if(user){
        res.status(400).json({
            success: false,
            message: "User with this email already exists"
        })
    }

    const userModel = new User({name,email,password});
    userModel.password = await bcrypt.hash(password);
    await userModel.save();

    res.status(201).json({
        success: true,
        message: "Successfully created a user"
    })

   } catch (error) {
    res.status(500).json({
        success: false,
        message: "Internal Server Error"
    });
   }
}

const login = async(req,res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user) {
            res.status(400).json({
                success: false,
                message: "User with these credentials doesnt exist"
            });
        }
        const passCheck = await bcrypt.compare(password, user.password);
        if(!passCheck) {
            res.status(403).json({
                success: false,
                message: "Incorrect credentials"
            })
        }
        const jwtToken = jwt.sign(
            {email: user.email, _id: user._id},
            process.env.JWT_SECRET,
            {expiresIn: '24h'}
        )

        res.status(200).json({
            success: true,
            message: "Successfully logged in"
        })

    } catch(error) {
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

const logout = async(req,res) => {
    res.status(200).json({
        success:true,
        data:{}
    })
}

module.exports = {
    register,
    login,
    logout
};
