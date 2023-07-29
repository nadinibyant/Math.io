const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();
const sequelize = new Sequelize(`mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}`);

const User = sequelize.define('user', {
    id_user:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    username:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type: DataTypes.STRING,
        allowNull:false
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    },
    created_at:{
        type:DataTypes.DATE,
    }, 
    updated_at:{
        type:DataTypes.DATE,
    }
  }, {
    tableName: 'user',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });

  module.exports = User