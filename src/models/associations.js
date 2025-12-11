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

const models = {
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

// Call associate methods if they exist
Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

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