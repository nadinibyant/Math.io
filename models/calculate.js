const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();
const User = require('./user')
const sequelize = new Sequelize(`mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}`);

const Calculate = sequelize.define('calculate', {
    id_pencarian:{
        type:DataTypes.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement: true
    },
    id_user:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:User,
            key: 'id_user'
        }
    },
    number1:{
        type:DataTypes.FLOAT,
        allowNull:false
    },
    number2:{
        type:DataTypes.FLOAT,
        allowNull:false
    },
    hasil:{
        type:DataTypes.FLOAT,
        allowNull:false
    },
    operation:{
        type: DataTypes.STRING,
        allowNull: false
    },
    created_at:{
        type:DataTypes.DATE
    },
    updated_at:{
        type:DataTypes.DATE
    }

},{
    tableName: 'calculate',
    timestamps:true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
})

module.exports = Calculate

