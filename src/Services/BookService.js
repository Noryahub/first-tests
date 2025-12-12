import bookRepository from '../Repository/BookRepository.js';
import { BookAuthor, Exemplaire } from '../models/associations.js';

class BookService {
  async create(bookData) {
    try {
      const { authors, ...bookFields } = bookData;
      const book = await bookRepository.create(bookFields);

      // Create BookAuthor associations
      if (authors && authors.length > 0) {
        const bookAuthors = authors.map(authorId => ({
          bookId: book.id,
          authorId: authorId,
        }));
        await BookAuthor.bulkCreate(bookAuthors);
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
      const book = await bookRepository.findById(id, {
        include: ['category', 'edition', 'authors', 'copies', 'reservations'],
      });
      return book;
    } catch (error) {
      throw new Error(`Error fetching book: ${error.message}`);
    }
  }

  async update(id, bookData) {
    try {
      const { authors, ...bookFields } = bookData;
      const updatedBook = await bookRepository.update(id, bookFields, {
        include: ['category', 'edition', 'authors', 'copies', 'reservations'],
      });
      if (!updatedBook) {
        throw new Error('Book not found');
      }

      // Update BookAuthor associations
      if (authors !== undefined) {
        await BookAuthor.destroy({ where: { bookId: id } });
        if (authors.length > 0) {
          const bookAuthors = authors.map(authorId => ({
            bookId: id,
            authorId: authorId,
          }));
          await BookAuthor.bulkCreate(bookAuthors);
        }
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
