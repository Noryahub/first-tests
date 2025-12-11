import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
const Book = sequelize.define('Book', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },

  publishedYear: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  isbn: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  imageUrl: {
    type: DataTypes.TEXT('long'),
    allowNull: true,
  },

  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },

  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references:{
      model:'Categories',
      key:'id'
    }
  },

  editionId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references:{
      model:'Editions',
      key:'id'
    }
  },

}, {
  tableName: 'Books',
  timestamps: false,
});

Book.associate = (models) => {
  Book.belongsTo(models.Category, { foreignKey: 'categoryId', as: 'category' });
  Book.belongsTo(models.Edition, { foreignKey: 'editionId', as: 'edition' });
  Book.hasMany(models.Exemplaire, { foreignKey: 'bookId', as: 'copies', onDelete: 'CASCADE' });
  Book.hasMany(models.Reservation, { foreignKey: 'bookId', as: 'reservations', onDelete: 'CASCADE' });
  Book.belongsToMany(models.Author, { through: models.BookAuthor, foreignKey: 'bookId', as: 'authors', onDelete: 'CASCADE' });
};

export default Book;