const {
    response
} = require('express')
const User = require('../models/user')
const bcrypt = require('bcryptjs');
const Swal = require('sweetalert2');

const controllers = {}

const register = async (req, res) => {
    const username = req.body.username
    const email = req.body.email
    const password = req.body.password

    if (!username) {
        res.status(400).json({
            success: false,
            message: 'Username Not Filled'
        })
    } else if (!email) {
        res.status(400).json({
            success: false,
            message: 'Email Not Filled'
        })
    } else if (!password) {
        res.status(400).json({
            success: false,
            message: 'Password Not Filled'
        })
    } else if (!username && !email && !password) {
        res.status(400).json({
            success: false,
            message: 'Data Has Not Been Completely Filled'
        })
    } else {
        if (username.length < 15) {
            res.status(400).json({
                success: false,
                message: 'Username Minimum 15 Characters'
            })
        } else {
            const findEmail = await User.findOne({
                where: {
                    email: email
                }
            })

            if (findEmail) {
                res.status(400).json({
                    success: false,
                    message: 'Email Already Used'
                })
            } else {
                const salt = bcrypt.genSaltSync(10);
                const hashedPassword = bcrypt.hashSync(password, salt);

                const addUser = await User.create({
                    username: username,
                    email: email,
                    password: hashedPassword
                })

                if (addUser) {
                    res.status(200).json({
                        success:true,
                        message: 'Account Successfully Registered',
                        data: {
                            username: username,
                            email: email,
                            password: hashedPassword,
                        }
                    })
                } else {
                    res.status(400).json({
                        success:false,
                        message: 'Account Not Successfully Registered'
                    })
                }
            }
        }
    }
}

controllers.register = register


module.exports = controllers