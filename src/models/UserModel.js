import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  nom: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  role: {
    type: DataTypes.ENUM('ADMIN', 'LIBRARIAN', 'MEMBER'),
    defaultValue: 'MEMBER',
  },
  createdBy: {
    type: DataTypes.INTEGER,
    allowNull: true, // un admin racine peut être null
    references: {
      model: 'Users',
      key: 'id',
    },
  },

  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'Users',
  timestamps: false,
});

User.associate = (models) => {
  User.belongsTo(models.User, { as: 'creator', foreignKey: 'createdBy' });
  User.hasMany(models.Emprunt, { foreignKey: 'userId', as: 'emprunts' });
  User.hasMany(models.Reservation, { foreignKey: 'userId', as: 'reservations' });
  User.hasMany(models.Amende, { foreignKey: 'userId', as: 'amendes' });
};

export default User;
