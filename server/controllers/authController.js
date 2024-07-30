const User = require('../models/user')
const {  comparePassword, hashPassword } = require('../helpers/auth')
const jwt = require('jsonwebtoken')

// const test = (req, res) => {
//     res.json('test is working')
// }

//Register Endpoint
const registerUser = async(req, res) => {
    try {
        const {name, email, password} = req.body;
        //chek if name was entered
        if(!name){
            return res.json({
                error: 'name is required'
            })
        };
        //check is password is good
        if(!password || password.length < 6){
            return res.json({
                error: 'password is required and should be at least 6 chracters long'
            })
        };
        //check email
        const exist = await User.findOne({email});
        if(exist){
            return res.json({
                error: 'email is taken already'
            })
        }
        const hashedPassword = await hashPassword(password)
        // create user in database
        const user = await User.create({
            name, 
            email, 
            password: hashedPassword,
        })

        return res.status(201).json(user)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Internal server error' });
    }
}

//Login Endpoint
const loginUser = async(req, res) => {
    try {
        const {email, password} = req.body;

        //check if user exist
        const user = await User.findOne({email});
        if(!user){
            return res.json({
                error: "No User Found"
            })
        }

        // check if password is matched
        const match = await comparePassword(password, user.password)
        if (match) {
            jwt.sign({email: user.email, id: user.id, name: user.name}, process.env.JWT_SECRET, {}, (err, token) => {
                if(err) throw err;
                res.cookie('token', token).json(user)
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

const getProfile = (req, res) => {
    const {token} = req.cookies
    if(token){
        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
            if(err) throw err;
            res.json(user)
        })
    }else{
        res.json(null)
    }
}

module.exports = {
    // test,
    registerUser, 
    loginUser,
    getProfile,
}