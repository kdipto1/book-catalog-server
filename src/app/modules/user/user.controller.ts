import { NextFunction, Request, RequestHandler, Response } from "express";
import { UserService } from "./user.service";
import httpStatus from "http-status";
import config from "../../../config";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.body;
    const result = await UserService.createUser(user);
    res.status(200).json({
      success: "true",
      statusCode: httpStatus.OK,
      message: "User created",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getSingleUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const result = await UserService.getSingleUser(id);
    res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: "User retrieved successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateUser: RequestHandler = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const result = await UserService.updateUser(id, data);
    res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: "User updated successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const deleteUser: RequestHandler = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await UserService.deleteUser(id);
    res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: "User deleted successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAllUsers: RequestHandler = async (req, res, next) => {
  try {
    const result = await UserService.getAllUsers();
    res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: "User retrieved successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const loginUser: RequestHandler = async (req, res, next) => {
  try {
    const data = req.body;
    const result = await UserService.loginUser(data);
    const { refreshToken, ...otherResults } = result;
    const cookieOptions = {
      secure: config.env === "production",
      httpOnly: true,
    };
    res.cookie("refreshToken", refreshToken, cookieOptions);
    res.status(200).json({
      success: "true",
      statusCode: httpStatus.OK,
      message: "User logged in successfully",
      data: otherResults,
    });
  } catch (error) {
    next(error);
  }
};

const refreshToken: RequestHandler = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;
    const result = await UserService.refreshToken(refreshToken);
    const cookieOptions = {
      secure: config.env === "production",
      httpOnly: true,
    };
    res.cookie("refreshToken", refreshToken, cookieOptions);
    res.status(200).json({
      success: "true",
      statusCode: httpStatus.OK,
      message: "New access token generated successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getMyProfile: RequestHandler = async (req, res, next) => {
  try {
    const user = req.user;
    const result = await UserService.getMyProfile(user);
    res.status(200).json({
      success: "true",
      statusCode: httpStatus.OK,
      message: "User's information retrieved successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const updateMyProfile: RequestHandler = async (req, res, next) => {
  try {
    const user = req.user;
    const data = req.body;
    const result = await UserService.updateMyProfile(user, data);
    res.status(200).json({
      success: "true",
      statusCode: httpStatus.OK,
      message: "User's information updated successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const addBookToWishlist: RequestHandler = async (req, res, next) => {
  try {
    const user = req.user;
    const data = req.body;
    const result = await UserService.addBookToWishlist(user, data);
    res.status(200).json({
      success: "true",
      statusCode: httpStatus.OK,
      message: "Book added to wishlist successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getWishlist: RequestHandler = async (req, res, next) => {
  try {
    const user = req.user;
    const result = await UserService.getWishlist(user);
    res.status(200).json({
      success: "true",
      statusCode: httpStatus.OK,
      message: "wishlist retrieved successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const addBookToReadingList: RequestHandler = async (req, res, next) => {
  try {
    const user = req.user;
    const data = req.body;
    const result = await UserService.addBookToReadingList(user, data);
    res.status(200).json({
      success: "true",
      statusCode: httpStatus.OK,
      message: "Book added to reading list successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const bookReadingState: RequestHandler = async (req, res, next) => {
  try {
    const user = req.user;
    const bookId = req.params;
    const result = await UserService.bookReadingState(user, bookId);
    res.status(200).json({
      success: "true",
      statusCode: httpStatus.OK,
      message: "Book marked as reading started",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const bookFinishState: RequestHandler = async (req, res, next) => {
  try {
    const user = req.user;
    const bookId = req.params;
    const result = await UserService.bookFinishState(user, bookId);
    res.status(200).json({
      success: "true",
      statusCode: httpStatus.OK,
      message: "Book marked as reading finished",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getReadingList: RequestHandler = async (req, res, next) => {
  try {
    const user = req.user;
    const result = await UserService.getReadingList(user);
    res.status(200).json({
      success: "true",
      statusCode: httpStatus.OK,
      message: "reading list retrieved successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const UserController = {
  createUser,
  getSingleUser,
  updateUser,
  deleteUser,
  getAllUsers,
  loginUser,
  refreshToken,
  getMyProfile,
  updateMyProfile,
  addBookToWishlist,
  getWishlist,
  addBookToReadingList,
  getReadingList,
  bookReadingState,
  bookFinishState,
};
