const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Projeto = sequelize.define('Projeto', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    titulo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descricao: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    papel: {
        type: DataTypes.STRING,
        allowNull: false
    },
    detalhes: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    tecnologias: {
        type: DataTypes.JSON,
        allowNull: true
    },
    link: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: 'projetos',
    timestamps: true
});

module.exports = Projeto;