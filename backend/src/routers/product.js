import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  related,
  updateProduct,
} from "../controllers/product";

const router = Router();

router.get("/products", getAllProducts);
router.post("/products", createProduct);
router.get("/products/:id", getProductById);
router.get("/products/:categoryId/related/:productId", related);
router.delete("/products/:id", deleteProduct);
router.put("/products/:id", updateProduct);

export default router;
