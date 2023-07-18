"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookService = void 0;
// import { ICOw, ICowFilters } from "./cow.interface";
// import { Cow } from "./cow.model";
// import { cowSearchableFields } from "./cow.constant";
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const book_model_1 = require("./book.model");
const book_constant_1 = require("./book.constant");
const createBook = (payload, user) => __awaiter(void 0, void 0, void 0, function* () {
    payload.addedBy = user.userId;
    const result = yield book_model_1.Book.create(payload);
    return result;
});
const getSingleBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_model_1.Book.findById(id)
        .populate({
        path: "reviews.reviewer",
        select: "name.firstName name.lastName",
    })
        .lean();
    if (!result)
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Book not found");
    return result;
});
const updateBook = (id, payload, user) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield book_model_1.Book.findById(id);
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Book Not found!");
    }
    if (user.userId !== isExist.addedBy.toString())
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "You can't update this book!");
    const result = yield book_model_1.Book.findByIdAndUpdate(isExist._id, payload, {
        new: true,
    });
    return result;
});
const addBookReview = (id, payload, user) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield book_model_1.Book.findById(id);
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Book Not found!");
    }
    const review = {
        reviewer: user.userId,
        rating: payload.rating,
        comment: payload.comment,
    };
    const result = yield book_model_1.Book.findByIdAndUpdate(id, { $push: { reviews: review } }, {
        new: true,
    });
    return result;
});
const deleteBook = (id, user) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield book_model_1.Book.findById(id);
    if (!isExist)
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Book not found!");
    if (user.userId !== isExist.addedBy.toString())
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "You are not the owner of this book");
    const result = yield book_model_1.Book.findByIdAndDelete(id);
    if (!result)
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Book couldn't delete");
    return result;
});
const getAllBooks = (skip, limit, sortBy, sortOrder, filters) => __awaiter(void 0, void 0, void 0, function* () {
    const sortCondition = {};
    if (sortBy && sortOrder) {
        sortCondition[sortBy] = sortOrder;
    }
    /**
     * todo : search
     */
    const { searchTerm, publicationYear } = filters, filtersData = __rest(filters, ["searchTerm", "publicationYear"]);
    const searchCondition = [];
    if (publicationYear) {
        const startOfYear = new Date(`${publicationYear}-01-01`);
        const endOfYear = new Date(`${publicationYear}-12-31`);
        const publicationDateCondition = {
            publicationDate: { $gte: startOfYear, $lte: endOfYear },
        };
        searchCondition.push(publicationDateCondition);
    }
    if (searchTerm) {
        searchCondition.push({
            $or: book_constant_1.bookSearchableFields.map(field => ({
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
    const availableSearch = searchCondition.length > 0 ? { $and: searchCondition } : {};
    const result = yield book_model_1.Book.find(availableSearch)
        .sort(sortCondition)
        .skip(skip)
        .limit(limit)
        .exec();
    const count = yield book_model_1.Book.count(availableSearch);
    return {
        result,
        count,
    };
});
const getHomeBooks = (limit, sortBy, sortOrder) => __awaiter(void 0, void 0, void 0, function* () {
    const sortCondition = {};
    if (sortBy && sortOrder) {
        sortCondition[sortBy] = sortOrder;
    }
    const result = yield book_model_1.Book.find().sort(sortCondition).limit(limit).exec();
    return {
        result,
    };
});
exports.BookService = {
    createBook,
    getSingleBook,
    updateBook,
    deleteBook,
    getAllBooks,
    getHomeBooks,
    addBookReview,
};
