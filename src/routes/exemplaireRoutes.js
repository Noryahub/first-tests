import express from 'express';
import exemplaireController from '../controllers/ExemplaireController.js';
import { authenticate } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/RoleMiddleware.js";

const router = express.Router();

router.get("/", authenticate, exemplaireController.getExemplaires);
router.get("/:id", authenticate, exemplaireController.getExemplaireById);
router.post("/", authenticate, authorizeRoles("ADMIN", "LIBRARIAN"), exemplaireController.createExemplaire);
router.put("/:id", authenticate, authorizeRoles("ADMIN", "LIBRARIAN"), exemplaireController.updateExemplaire);
router.delete("/:id", authenticate, authorizeRoles("ADMIN"), exemplaireController.deleteExemplaire);


export default router;
