const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Disciplina = sequelize.define('Disciplina', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    semestre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ordem: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    }
}, {
    tableName: 'disciplinas',
    timestamps: true
});

module.exports = Disciplina;