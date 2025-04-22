// models/MedicalHistory.js
const { DataTypes } = require('sequelize');
const sequelize = require('../server').sequelize;

const MedicalHistory = sequelize.define('MedicalHistory', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Users',
      key: 'id'
    }
  }
});

// Define association in User model
User.hasMany(MedicalHistory, { foreignKey: 'userId' });
MedicalHistory.belongsTo(User, { foreignKey: 'userId' });

module.exports = MedicalHistory;