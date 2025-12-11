import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Edition = sequelize.define('Edition', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  publisherAddress: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'Editions',
  timestamps: false,
});

Edition.associate = (models) => {
  Edition.hasMany(models.Book, { foreignKey: 'editionId', as: 'books' });
};

export default Edition;