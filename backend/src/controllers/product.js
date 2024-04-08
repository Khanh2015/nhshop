import { StatusCodes } from "http-status-codes";
import Product from "../models/product";

export const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    return res.status(StatusCodes.CREATED).json(product);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
  }
};

export const getAllProducts = async (req, res) => {
  const {
    _page = 1,
    _limit = 10,
    // _sort = "createdAt",
    // _order = "asc",
    // _expand,
  } = req.query;

  const options = {
    page: _page,
    limit: _limit,
    populate: "category",
    // sort: { [_sort]: _order === "desc" ? -1 : 1 },
  };

  // const populateOption = _expand ? [{ path: "category", select: "name" }] : [];
  try {
    const result = await Product.paginate(
      // { categoryId: null },
      // { ...option, populate: populateOption }
      {},
      options
    );

    if (result.docs.length === 0)
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "No product found" });

    const response = {
      data: result.docs,
      pagination: {
        curentPage: result.page,
        totalPages: result.totalPages,
        totalItems: result.totalDocs,
      },
    };

    return res.status(StatusCodes.OK).json(response);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
  }
};

// export const getAllProducts = async (req, res) => {
//   try {
//     const { _page = 1, _limit = 10 } = req.query;

//     const option = {
//       page: _page,
//       limit: _limit,
//     };

//     const data = await Product.paginate({}, option);

//     if (data.docs.length === 0)
//       return res
//         .status(StatusCodes.NOT_FOUND)
//         .json({ message: "No product found" });
//     return res.status(StatusCodes.OK).json(data);
//   } catch (error) {
//     return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
//   }
// };

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("category");
    if (product.length === 0)
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "No product found" });
    return res.status(StatusCodes.OK).json(product);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    return res.status(StatusCodes.OK).json(product);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res.status(StatusCodes.OK).json(product);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
  }
};

export const related = async (req, res) => {
  try {
    const product = await Product.find({
      category: req.params.categoryId,
      _id: { $ne: req.params.productId },
    }).populate("category");
    return res.status(StatusCodes.OK).json(product);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
  }
};
