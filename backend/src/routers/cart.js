import { Router } from "express";
import {
  addItemToCart,
  decreaseProductQuantity,
  getCartByUserId,
  increaseProductQuantity,
  removeItemFromCart,
  updateProductQuantity,
} from "../controllers/cart";

const router = Router();

router.post("/carts/add-to-cart", addItemToCart);
router.get("/carts/:userId", getCartByUserId);
router.post("/carts/remove-from-cart", removeItemFromCart);
router.put("/carts/update-product-quantity", updateProductQuantity);
router.post("/carts/increase", increaseProductQuantity);
router.post("/carts/decrease", decreaseProductQuantity);

export default router;
