const {
    response
} = require("express");
const Calculate = require('../models/calculate')
const User = require('../models/user')
const jwt = require('jsonwebtoken');
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

const getViewCalculator = async (req, res) => {
    try {
        const foundUser = await User.findOne({
          where: {
            id_user: req.session.id_user
          }
        });
    
        if (!foundUser) {
          return res.redirect('/login');
        }
        res.render('calculator')
      } catch (error) {
        return res.redirect('/login');
      }
   
}
controllers.getViewCalculator = [verifyToken, getViewCalculator]

const calculate = async (req, res) => {
    const number1 = req.body.number1
    const number2 = req.body.number2
    const operation = req.body.operation

    if (!number1) {
        res.status(400).json({
            success: false,
            message: 'Number1 Not Filled In'
        })
    } else if (!number2) {
        res.status(400).json({
            success: false,
            message: 'Number2 Not Filled In'
        })
    } else if (!operation) {
        res.status(400).json({
            success: false,
            message: 'Operation Not Selected'
        })
    } else if (!number1 && !number2) {
        res.status(400).json({
            success: false,
            message: 'Please Enter Numbers First'
        })
    } else {
        const findUser = await User.findOne({
            where: {
                id_user: req.session.id_user
            }
        })

        if (findUser) {
            const id_user = findUser.id_user

            const number1float = parseFloat(number1)
            const number2float = parseFloat(number2)

            let total

            if (operation == '+') {
                total = number1float + number2float
            } else if (operation == 'x') {
                total = number1float * number2float
            } else if (operation == '%') {
                total = number1float % number2float
            } else if (operation == '/') {
                total = number1float / number2float
            } else if (operation == '-') {
                total = number1float - number2float
            } else {
                res.status(400).json({
                    success: false,
                    message: 'Option Not Found'
                })
            }

            const addCalculate = await Calculate.create({
                id_user: id_user,
                number1: number1float,
                number2: number2float,
                operation: operation,
                hasil: total
            })

            if (addCalculate) {
                res.status(200).json({
                    success: true,
                    message: 'Calculation Success',
                    number1: number1,
                    number2: number2,
                    operation: operation,
                    hasil: total
                })
            } else {
                res.status(400).json({
                    success: false,
                    message: 'Unsuccessful Calculation'
                })
            }

        } else {
            res.status(400).json({
                success: false,
                message: 'User Not Found'
            })
        }

    }

}
controllers.calculate = calculate

const getDataCalculate = async (req, res) => {
    const findUser = await User.findOne({
        where: {
            id_user: req.session.id_user
        }
    })

    if (findUser) {
        const findDataCal = await Calculate.findAll({
            where: {
                id_user: findUser.id_user
            }
        })

        if (findDataCal.length > 0) {
            const data = findDataCal.map((cal) => ({
                number1: cal.number1,
                number2: cal.number2,
                operation: cal.operation,
                hasil: cal.hasil,
                created_at: cal.created_at
            }))

            res.status(200).json({
                success: true,
                dataCal: data
            })
        } else {
            res.status(400).json({
                success: false,
                message: 'There is No Calculation Data Yet'
            })
        }
    } else {
        res.status(400).json({
            success: false,
            message: 'User Not Found'
        })
    }
}
controllers.getDataCalculate = getDataCalculate

module.exports = controllers