const {
    response
} = require("express");
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const controllers = {}

const login = async (req, res) => {
    const email = req.body.email
    const password = req.body.password
    if (!email) {
        res.status(400).json({
            success: false,
            message: 'Unfilled Email'
        })
    } else if (!password) {
        res.status(400).json({
            success: false,
            message: 'Password Not Filled'
        })
    } else {
        const findAcc = await User.findOne({
            where: {
                email: email
            }
        })

        if (findAcc) {
            const getPass = findAcc.password
            const id_user = findAcc.id_user

            bcrypt.compare(password, getPass, async (err, result) => {
                if (err || !result) {
                    // Password tidak valid
                    return res.status(401).json({
                        success: false,
                        message: 'Password wrong'
                    });
                }

                // Jika email dan password benar
                const token = jwt.sign({
                        id_user: id_user,
                        email
                    },
                    process.env.ACCESS_TOKEN_SECRET, {
                        expiresIn: '2h'
                    }
                );

                req.session.id_user = id_user

                res.cookie('token', token, {
                    httpOnly: true,
                    maxAge: 2 * 60 * 60 * 1000, 
                });

                res.status(200).json({
                    message: 'Login Successful',
                    token: token,
                    success: true,
                    id_user: req.session.id_user
                });
            });
        } else {
            res.status(400).json({
                success:false,
                message: 'Email Not Found'
            })
        }
    }
}
controllers.login= login

module.exports = controllers