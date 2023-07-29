const {
    response
} = require("express");
const controllers = {}
const jwt = require('jsonwebtoken');
const User = require ('../models/user')

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

const viewHome = async (req, res) => {
    try {
        const foundUser = await User.findOne({
          where: {
            id_user: req.session.id_user
          }
        });
    
        if (!foundUser) {
          return res.redirect('/login');
        }
        res.render('index2')
      } catch (error) {
        return res.redirect('/login');
      }
}
controllers.viewHome = [verifyToken, viewHome]

const getUsername = async (req,res) => {
    const findUser = await User.findOne({
        where:{
            id_user: req.session.id_user
        }
    })

    if (findUser) {
        res.status(200).json({
            success: true,
            username: findUser.username
        })
    } else {
        res.status(400).json({
            success: false,
            message: 'Pegguna Tidak Ditemukan'
        })
    } 
}
controllers.getUsername = getUsername

const getViewDoc = async (req,res) => {
    try {
        const foundUser = await User.findOne({
          where: {
            id_user: req.session.id_user
          }
        });
    
        if (!foundUser) {
          return res.redirect('/login');
        }
        res.render('doc')
      } catch (error) {
        return res.redirect('/login');
      }
    
}
controllers.getViewDoc = [verifyToken,getViewDoc]

module.exports = controllers