import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Exemplaire = sequelize.define('Exemplaire', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  etat: {
    type: DataTypes.ENUM('neuf', 'bon', 'abîmé', 'très abîmé', 'perdu'),
    defaultValue: 'neuf',
  },
  disponible: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  barcode: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  bookId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'Exemplaires',
  timestamps: false,
});

export default Exemplaire;