import { Router } from "express";
import {
  createcategory,
  deleteCategory,
  getAll,
  getCategoryById,
  updateCategory,
} from "../controllers/category";

const router = Router();

router.get("/categories", getAll);
router.post("/categories", createcategory);
router.get("/categories/:id", getCategoryById);
router.delete("/categories/:id", deleteCategory);
router.put("/categories/:id", updateCategory);

export default router;
