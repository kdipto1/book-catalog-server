import { NextFunction, Request, RequestHandler, Response } from "express";
import httpStatus from "http-status";
import { SortOrder } from "mongoose";
// import { cowFilterableFields } from "./cow.constant";
// import pick from "../../../shared/pick";
import { BookService } from "./book.service";
import pick from "../../../shared/pick";
import { bookFilterableFields } from "./book.constant";

const createBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body;
    const user = req.user;
    const result = await BookService.createBook(data, user);
    res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: "Book added successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getSingleBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const result = await BookService.getSingleBook(id);
    res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: "Book retrieved successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateBook: RequestHandler = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = req.user;
    const data = req.body;
    const result = await BookService.updateBook(id, user, data);
    res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: "Book updated successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const deleteBook: RequestHandler = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = req.user;
    const result = await BookService.deleteBook(id, user);
    res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: "Book deleted successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAllBooks: RequestHandler = async (req, res, next) => {
  try {
    const filters = pick(req.query, bookFilterableFields);
    const page = Number(req.query.page || 1);
    const limit = Number(req.query.limit || 10);
    const skip = (page - 1) * limit;
    const sortBy = (req.query.sortBy as string) || "";
    const sortOrder: SortOrder = (req.query.sortOrder as SortOrder) || "asc";

    const result = await BookService.getAllBooks(
      skip,
      limit,
      sortBy,
      sortOrder,
      filters
    );
    res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: "Books retrieved successfully",
      meta: {
        page,
        limit,
        count: result.count,
      },
      data: result.result,
    });
  } catch (error) {
    next(error);
  }
};
const getHomeBooks: RequestHandler = async (req, res, next) => {
  try {
    const page = 1;
    const limit = 10;
    // const skip = (page - 1) * limit;
    const sortBy = "createdAt";
    const sortOrder: SortOrder = "desc";

    const result = await BookService.getHomeBooks(limit, sortBy, sortOrder);
    res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: "Books retrieved successfully",
      meta: {
        page,
        limit,
      },
      data: result.result,
    });
  } catch (error) {
    next(error);
  }
};

export const BookController = {
  createBook,
  getSingleBook,
  updateBook,
  deleteBook,
  getAllBooks,
  getHomeBooks,
};
