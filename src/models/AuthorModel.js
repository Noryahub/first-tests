import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Author = sequelize.define('Author', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  biography: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  tableName: 'Authors',
  timestamps: false,
});

Author.associate = (models) => {
  Author.belongsToMany(models.Book, { through: models.BookAuthor, foreignKey: 'authorId', as: 'books' });
};

export default Author;