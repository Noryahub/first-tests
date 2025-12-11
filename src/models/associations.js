import User from './UserModel.js';
import Book from './BookModel.js';
import Author from './AuthorModel.js';
import Exemplaire from './ExemplaireModel.js';
import Emprunt from './Emprunt.js';
import Reservation from './Reservation.js';
import Category from './CategoryModel.js';
import Edition from './EditionModel.js';
import Amende from './Amende.js';
import BookAuthor from './BookAuthor.js';

// Define associations

// User has many Emprunts
User.hasMany(Emprunt, { foreignKey: 'userId', as: 'emprunts' });

// User has many Reservations
User.hasMany(Reservation, { foreignKey: 'userId', as: 'reservations' });

// User has many Amendes
User.hasMany(Amende, { foreignKey: 'userId', as: 'amendes' });

// Book belongs to Category
Book.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });

// Book belongs to Edition
Book.belongsTo(Edition, { foreignKey: 'editionId', as: 'edition' });

// Book has many Exemplaires
Book.hasMany(Exemplaire, { foreignKey: 'bookId', as: 'copies', onDelete: 'CASCADE' });

// Book has many Reservations
Book.hasMany(Reservation, { foreignKey: 'bookId', as: 'reservations', onDelete: 'CASCADE' });

// Book belongs to many Authors through BookAuthor
Book.belongsToMany(Author, { through: BookAuthor, foreignKey: 'bookId', as: 'authors', onDelete: 'CASCADE' });

// Author belongs to many Books through BookAuthor
Author.belongsToMany(Book, { through: BookAuthor, foreignKey: 'authorId', as: 'books' });

// Category has many Books
Category.hasMany(Book, { foreignKey: 'categoryId', as: 'books' });

// Edition has many Books
Edition.hasMany(Book, { foreignKey: 'editionId', as: 'books' });

// Exemplaire belongs to Book
Exemplaire.belongsTo(Book, { foreignKey: 'bookId', as: 'book' });

// Exemplaire has many Emprunts
Exemplaire.hasMany(Emprunt, { foreignKey: 'copyId', as: 'emprunts' });

// Emprunt belongs to Exemplaire
Emprunt.belongsTo(Exemplaire, { foreignKey: 'copyId', as: 'copy' });

// Emprunt belongs to User
Emprunt.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// Emprunt has many Amendes
Emprunt.hasMany(Amende, { foreignKey: 'loanId', as: 'amendes' });

// Reservation belongs to User
Reservation.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// Reservation belongs to Book
Reservation.belongsTo(Book, { foreignKey: 'bookId', as: 'book' });

// Amende belongs to User
Amende.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// Amende belongs to Emprunt
Amende.belongsTo(Emprunt, { foreignKey: 'loanId', as: 'loan' });

export {
  User,
  Book,
  Author,
  Exemplaire,
  Emprunt,
  Reservation,
  Category,
  Edition,
  Amende,
  BookAuthor,
};