import { StatusCodes } from "http-status-codes";
import Cart from "../models/cart";

export const getCartByUserId = async (req, res) => {
  const { userId } = req.params;
  try {
    const cart = await Cart.findOne({ userId }).populate("products.productId");

    const cartData = cart.products.map((item) => {
      return {
        productId: item.productId._id,
        name: item.productId.name,
        price: item.productId.price,
        image: item.productId.image,
        quantity: item.quantity,
      };
    });

    return res.status(StatusCodes.OK).json({ products: cartData });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

export const addItemToCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    // kiểm tra có giỏ hàng nào của user chưa
    let cart = await Cart.findOne({ userId });

    // nếu chưa có thì tạo mới
    if (!cart) {
      cart = new Cart({ userId, products: [] });
    }

    // kiểm tra sản phẩm đã tồn tại trong giỏ hàng chưa
    const existProductIndex = cart.products.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (existProductIndex !== -1) {
      // nếu đã tồn tại thì cập nhật số lượng
      cart.products[existProductIndex].quantity += quantity;
    } else {
      // nếu chưa tồn tại thì thêm mới
      cart.products.push({ productId, quantity });
    }

    await cart.save();
    return res.status(StatusCodes.CREATED).json({ cart });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

export const removeItemFromCart = async (req, res) => {
  const { userId, productId } = req.body;
  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Cart not found" });
    }
    cart.products = cart.products.filter(
      (item) => item.productId && item.productId.toString() !== productId
    );

    await cart.save();
    return res.status(StatusCodes.OK).json({ cart });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

export const updateProductQuantity = async (req, res) => {
  const { userId, productId, quantity } = req.body;
  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Cart not found" });
    }

    const product = cart.products.find(
      (item) => item.productId.toString() === productId
    );
    if (!product) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Product not found" });
    }

    product.quantity = quantity;
    await cart.save();
    return res.status(StatusCodes.OK).json({ cart });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

export const increaseProductQuantity = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Cart not found" });
    }

    const product = cart.products.find(
      (item) => item.productId.toString() === productId
    );
    if (!product) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Product not found" });
    }

    product.quantity++;

    await cart.save();
    return res.status(StatusCodes.OK).json(cart);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
  }
};

export const decreaseProductQuantity = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Cart not found" });
    }

    const product = cart.products.find(
      (item) => item.productId.toString() === productId
    );
    if (!product) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Product not found" });
    }
    if (product.quantity > 1) {
      product.quantity--;
    }

    await cart.save();
    return res.status(StatusCodes.OK).json(cart);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
  }
};
