const {
    response
} = require("express");
const User = require('../models/user');
const {
    Op
} = require("sequelize");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const controllers = {}

const verifyToken = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.redirect('/login');
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded.id_user;
        next();
    } catch (error) {
        return res.redirect('/login');
    }
};

const getViewsProfile = async (req, res) => {
    try {
        const foundUser = await User.findOne({
          where: {
            id_user: req.session.id_user
          }
        });
    
        if (!foundUser) {
          return res.redirect('/login');
        }
        res.render('profile')
      } catch (error) {
        return res.redirect('/login');
      }
    
}

controllers.getViewsProfile = [verifyToken, getViewsProfile]

const getDataProfile = async (req, res) => {
    const findUser = await User.findOne({
        where: {
            id_user: req.session.id_user
        }
    })

    if (findUser) {
        const username = findUser.username
        const email = findUser.email

        res.status(200).json({
            success: true,
            username: username,
            email: email
        })
    } else {
        res.status(400).json({
            success: false,
            message: 'User Not Found'
        })
    }
}
controllers.getDataProfile = getDataProfile

const editProfile = async (req,res) => {
    const findUser = await User.findOne({
        where:{
            id_user: req.session.id_user
        }
    })

    const id_user = findUser.id_user
    const usernameUser = findUser.username
    const emailUser = findUser.email

    const username = req.body.username || usernameUser
    const email = req.body.email || emailUser

    const oldPassword = req.body.oldPassword
    const newPassword = req.body.newPassword

    if (oldPassword == '' && newPassword == '') {
        if (username != '' && username.length < 15) {
            res.status(400).json({
                success: false, 
                message: 'Username Minimum 15 Characters'
            })
        } else {
            const findEmail = await User.findOne({
                where:{
                    email: email
                }
            })

            if (findEmail && findEmail.email !== emailUser) {
                res.status(400).json({
                    success: false,
                    message: 'Email Already Used, Use Another Email'
                })
            } else {
                const updateProfile = await User.update({
                    email: email,
                    username: username
                },{
                    where:{
                        id_user: id_user
                    }
                })

                if (updateProfile) {
                    res.status(200).json({
                        success: true, 
                        message: 'Data Changed Successfully'
                    })
                } else {
                    res.status(400).json({
                        success: false,
                        message: 'Data Not Successfully Modified'
                    })
                }
            }
        }
    } else {
        if (!oldPassword) {
            res.status(400).json({
                success: false,
                message: 'Old Password Not Filled In'
            })
        } else if (!newPassword){
            res.status(400).json({
                success: false,
                message: 'New Password Not Filled In'
            })
        } else {
            if (username != '' && username.length < 15) {
                res.status(400).json({
                    success: false, 
                    message: 'Username Minimum 15 Characters'
                })
            } else {
                const findEmail = await User.findOne({
                    where:{
                        email: email
                    }
                })

                if (findEmail && findEmail.email !== emailUser) {
                    res.status(400).json({
                        success: false,
                        message: 'Email Already Used, Use Another Email'
                    })
                } else {
                    const passwordUser = findUser.password

                    const salt = bcrypt.genSaltSync(10);
                    const passwordMatch = bcrypt.compareSync(oldPassword, passwordUser);

                    if (passwordMatch) {
                        const hashNewPass = bcrypt.hashSync(newPassword, salt)

                        const updateProfile = await User.update({
                            email:email,
                            username: username,
                            password: hashNewPass
                        },{
                            where:{
                                id_user:id_user
                            }
                        })

                        if (updateProfile) {
                            res.status(200).json({
                                success: 'berhasil', 
                                message: 'Data Changed Successfully'
                            })
                        } else {
                            res.status(400).json({
                                success: false, 
                                message: 'Data Not Successfully Modified'
                            })
                        }
                    } else {
                        res.status(400).json({
                            success: false,
                            message: 'Old Password Incorrect'
                        })
                    }
                }
            }
        }
    }
}

controllers.editProfile = editProfile

const logout = async (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                success: false,
                message: 'Gagal logout',
            });
        }

        res.clearCookie('sessionID'); // Hapus cookie sesi jika menggunakan cookie-based session
        return res.status(200).json({
            success: true,
            message: 'Logout berhasil',
        });
    });
}

controllers.logout = [verifyToken, logout]

module.exports = controllers