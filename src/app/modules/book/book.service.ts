import { SortOrder } from "mongoose";
// import { ICOw, ICowFilters } from "./cow.interface";
// import { Cow } from "./cow.model";
// import { cowSearchableFields } from "./cow.constant";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";
import { JwtPayload } from "jsonwebtoken";
import { IBook, IBookFilters } from "./book.interface";
import { Book } from "./book.model";
import { bookSearchableFields } from "./book.constant";

const createBook = async (payload: IBook, user: JwtPayload) => {
  payload.addedBy = user.userId;
  const result = await Book.create(payload);
  return result;
};

const getSingleBook = async (id: string): Promise<IBook | null> => {
  const result = await Book.findById(id);
  if (!result) throw new ApiError(httpStatus.NOT_FOUND, "Book not found");
  return result;
};

const updateBook = async (
  id: string,
  user: JwtPayload,
  payload: Partial<IBook>
): Promise<IBook | null> => {
  const isExist = await Book.findById(id);
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "Book Not found!");
  }
  // const cowSellerId = isExist.seller;
  // console.log(seller);
  if (user.userId !== isExist.addedBy.toString())
    throw new ApiError(httpStatus.BAD_REQUEST, "You can't update this book!");

  const result = await Book.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

const deleteBook = async (id: string, user: JwtPayload) => {
  const isExist = await Book.findById(id);
  if (!isExist) throw new ApiError(httpStatus.BAD_REQUEST, "Book not found!");

  if (user.userId !== isExist.addedBy.toString())
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "You are not the owner of this book"
    );
  const result = await Book.findByIdAndDelete(id);
  if (!result)
    throw new ApiError(httpStatus.BAD_REQUEST, "Book couldn't delete");
  return result;
};

const getAllBooks = async (
  skip: number,
  limit: number,
  sortBy: string,
  sortOrder: SortOrder,
  filters: IBookFilters
) => {
  const sortCondition: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }

  /**
   * todo : search
   */
  const { searchTerm, ...filtersData } = filters;
  const searchCondition = [];

  if (searchTerm) {
    searchCondition.push({
      $or: bookSearchableFields.map(field => ({
        [field]: { $regex: searchTerm, $options: "i" },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    searchCondition.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: { $regex: value, $options: "i" },
      })),
    });
  }
  const availableSearch =
    searchCondition.length > 0 ? { $and: searchCondition } : {};
  const result = await Book.find(availableSearch)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);
  const count = await Book.count(availableSearch);
  return {
    result,
    count,
  };
};

export const BookService = {
  createBook,
  getSingleBook,
  updateBook,
  deleteBook,
  getAllBooks,
};
