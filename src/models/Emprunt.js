import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Emprunt = sequelize.define('Emprunt', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  loanDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  dueDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  returnDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  copyId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'Emprunts',
  timestamps: false,
});

Emprunt.associate = (models) => {
  Emprunt.belongsTo(models.Exemplaire, { foreignKey: 'copyId', as: 'copy' });
  Emprunt.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  Emprunt.hasMany(models.Amende, { foreignKey: 'loanId', as: 'amendes' });
};

export default Emprunt;