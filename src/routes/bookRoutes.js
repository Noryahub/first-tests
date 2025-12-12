import express from 'express';
import bookController from '../controllers/BookController.js';
import { authenticate } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/RoleMiddleware.js';

const router = express.Router();

router.get('/', bookController.getBooks);
router.get('/:id', authenticate, bookController.getBookById);

router.post(
  '/',
  authenticate,
  authorizeRoles('ADMIN'),
  bookController.createBook
);

router.put(
  '/:id',
  authenticate,
  authorizeRoles('ADMIN'),
  bookController.updateBook
);

router.delete(
  '/:id',
  authenticate,
  authorizeRoles('ADMIN'),
  bookController.deleteBook
);
export default router;
