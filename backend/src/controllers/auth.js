import Joi from "joi";
import { StatusCodes } from "http-status-codes";
import bcryptjs from "bcryptjs";
import User from "../models/user";
import jwt from "jsonwebtoken";

const signupSchema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    "any.required": "Trường name là bắt buộc",
    "string.empty": "Trường name không được bỏ trống",
    "string.min": "Trường name phải có ít nhất {#limit} ký tự",
    "string.max": "Trường name không được vượt quá {#limit} ký tự",
  }),
  email: Joi.string().email().required().messages({
    "any.required": "Trường email là bắt buộc",
    "string.empty": "Trường email không được bỏ trống",
    "string.email": "Trường email phải là email",
  }),
  password: Joi.string().min(6).required().messages({
    "any.required": "Trường password là bắt buộc",
    "string.empty": "Trường password không được bỏ trống",
    "string.min": "Trường password phải có ít nhất {#limit} ký tự",
  }),
  confirmPassword: Joi.string().required().valid(Joi.ref("password")).messages({
    "any.required": "Trường confirmPassword là bắt buộc",
    "any.only": "Mật khẩu không khớp",
  }),
  avatar: Joi.string().uri().message({
    "string.uri": "Trường avatar phải là đường dẫn hợp lệ",
  }),
});

export const signup = async (req, res) => {
  const { email, password, name, avatar } = req.body;
  const { error } = signupSchema.validate(req.body, { abortEarly: false });
  if (error) {
    const message = error.details.map((item) => item.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message });
  }

  const existUser = await User.findOne({ email });
  if (existUser) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Email đã tồn tại" });
  }

  const hashedPassword = await bcryptjs.hash(password, 12);

  const role = (await User.countDocuments({})) === 0 ? "admin" : "user";

  const user = await User.create({
    ...req.body,
    password: hashedPassword,
    role,
  });

  return res.status(StatusCodes.CREATED).json({ user });
};

const signinSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "any.required": "Trường email là bắt buộc",
    "string.empty": "Trường email không được bỏ trống",
    "string.email": "Trường email phải là email",
  }),
  password: Joi.string().min(6).required().messages({
    "any.required": "Trường password là bắt buộc",
    "string.empty": "Trường password không được bỏ trống",
    "string.min": "Trường password phải có ít nhất {#limit} ký tự",
  }),
});

export const signin = async (req, res) => {
  const { email, password } = req.body;
  const { error } = signinSchema.validate(req.body, { abortEarly: false });
  if (error) {
    const message = error.details.map((item) => item.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(StatusCodes.NOT_FOUND).json({
      messages: ["Email không tồn tại"],
    });
  }
  const isMatch = await bcryptjs.compare(password, user.password);
  if (!isMatch) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      messages: ["Mật khẩu không chính xác"],
    });
  }
  const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
    expiresIn: "7d",
  });
  return res.status(StatusCodes.OK).json({
    user,
    token,
  });
};
export const logout = async (req, res) => {};
