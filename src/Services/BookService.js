import bookRepository from '../Repository/BookRepository.js';
import { BookAuthor, Exemplaire } from '../models/associations.js';

class BookService {
  async create(bookData) {
    try {
      const { authorIds, numExemplaires, ...bookFields } = bookData;
      const book = await bookRepository.create(bookFields);

      // Create BookAuthor associations
      if (authorIds && authorIds.length > 0) {
        const bookAuthors = authorIds.map(authorId => ({
          bookId: book.id,
          authorId: authorId,
        }));
        await BookAuthor.bulkCreate(bookAuthors);
      }

      // Create exemplaires
      if (numExemplaires && numExemplaires > 0) {
        const exemplaires = [];
        for (let i = 0; i < numExemplaires; i++) {
          exemplaires.push({
            bookId: book.id,
            barcode: `BK${book.id}EX${i + 1}`,
            status: 'AVAILABLE',
          });
        }
        await Exemplaire.bulkCreate(exemplaires);
      }

      return book;
    } catch (error) {
      throw new Error(`Error creating book: ${error.message}`);
    }
  }

  async findAll() {
    try {
      const books = await bookRepository.findAll();
      return books;
    } catch (error) {
      throw new Error(`Error fetching books: ${error.message}`);
    }
  }

  async findById(id) {
    try {
      const book = await bookRepository.findByPk(id, {
        include: ['category', 'edition', 'authors', 'copies', 'reservations'],
      });
      return book;
    } catch (error) {
      throw new Error(`Error fetching book: ${error.message}`);
    }
  }

  async update(id, bookData) {
    try {
      const { authorIds, addExemplaires, ...bookFields } = bookData;
      const updatedBook = await bookRepository.update(id, bookFields, {
        include: ['category', 'edition', 'authors', 'copies', 'reservations'],
      });
      if (!updatedBook) {
        throw new Error('Book not found');
      }

      // Update BookAuthor associations
      if (authorIds !== undefined) {
        await BookAuthor.destroy({ where: { bookId: id } });
        if (authorIds.length > 0) {
          const bookAuthors = authorIds.map(authorId => ({
            bookId: id,
            authorId: authorId,
          }));
          await BookAuthor.bulkCreate(bookAuthors);
        }
      }

      // Add more exemplaires
      if (addExemplaires && addExemplaires > 0) {
        const existingCount = await Exemplaire.count({ where: { bookId: id } });
        const exemplaires = [];
        for (let i = 0; i < addExemplaires; i++) {
          exemplaires.push({
            bookId: id,
            barcode: `BK${id}EX${existingCount + i + 1}`,
            status: 'AVAILABLE',
          });
        }
        await Exemplaire.bulkCreate(exemplaires);
      }

      return updatedBook;
    } catch (error) {
      throw new Error(`Error updating book: ${error.message}`);
    }
  }

  async delete(id) {
    try {
      const deleted = await bookRepository.delete(id);
      if (deleted > 0) {
        return { message: 'Book deleted successfully' };
      }
      throw new Error('Book not found');
    } catch (error) {
      throw new Error(`Error deleting book: ${error.message}`);
    }
  }
}

export default new BookService();
