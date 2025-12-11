import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Reservation = sequelize.define('Reservation', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  reservationDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  status: {
    type: DataTypes.ENUM('PENDING', 'CONFIRMED', 'CANCELLED'),
    defaultValue: 'PENDING',
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  bookId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'Reservations',
  timestamps: false,
});

Reservation.associate = (models) => {
  Reservation.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  Reservation.belongsTo(models.Book, { foreignKey: 'bookId', as: 'book' });
};

export default Reservation;