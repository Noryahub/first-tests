import bookRepository from '../Repository/BookRepository.js';

class BookService {
  async create(bookData) {
    try {
      return await bookRepository.create(bookData);
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
      const updatedBook = await bookRepository.update(id, bookData, {
        include: ['category', 'edition', 'authors', 'copies', 'reservations'],
      });
      if (updatedBook) {
        return updatedBook;
      }
      throw new Error('Book not found');
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
