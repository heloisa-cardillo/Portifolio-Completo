const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Contato = sequelize.define('Contato', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    tipo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    valor: {
        type: DataTypes.STRING,
        allowNull: false
    },
    icone: {
        type: DataTypes.STRING,
        allowNull: true
    },
    link: {
        type: DataTypes.STRING,
        allowNull: true
    },
    ordem: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    }
}, {
    tableName: 'contatos',
    timestamps: true
});

module.exports = Contato;