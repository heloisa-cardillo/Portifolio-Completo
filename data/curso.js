const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Curso = sequelize.define('Curso', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    instituicao: {
        type: DataTypes.STRING,
        allowNull: false
    },
    pdfUrl: {
        type: DataTypes.STRING,
        allowNull: true
    },
    ordem: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    }
}, {
    tableName: 'cursos',
    timestamps: true
});

module.exports = Curso;