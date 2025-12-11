import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Amende = sequelize.define('Amende', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('PAID', 'UNPAID'),
    defaultValue: 'UNPAID',
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  loanId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'Amendes',
  timestamps: false,
});

Amende.associate = (models) => {
  Amende.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  Amende.belongsTo(models.Emprunt, { foreignKey: 'loanId', as: 'loan' });
};

export default Amende;