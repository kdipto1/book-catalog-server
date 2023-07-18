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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookController = void 0;
const http_status_1 = __importDefault(require("http-status"));
// import { cowFilterableFields } from "./cow.constant";
// import pick from "../../../shared/pick";
const book_service_1 = require("./book.service");
const pick_1 = __importDefault(require("../../../shared/pick"));
const book_constant_1 = require("./book.constant");
const createBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const user = req.user;
        const result = yield book_service_1.BookService.createBook(data, user);
        res.status(http_status_1.default.OK).json({
            success: true,
            statusCode: http_status_1.default.OK,
            message: "Book added successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const getSingleBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const result = yield book_service_1.BookService.getSingleBook(id);
        res.status(http_status_1.default.OK).json({
            success: true,
            statusCode: http_status_1.default.OK,
            message: "Book retrieved successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const updateBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const user = req.user;
        const data = req.body;
        const result = yield book_service_1.BookService.updateBook(id, data, user);
        res.status(http_status_1.default.OK).json({
            success: true,
            statusCode: http_status_1.default.OK,
            message: "Book updated successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const addBookReview = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const user = req.user;
        const review = req.body;
        const result = yield book_service_1.BookService.addBookReview(id, review, user);
        res.status(http_status_1.default.OK).json({
            success: true,
            statusCode: http_status_1.default.OK,
            message: "Book updated successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const deleteBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const user = req.user;
        const result = yield book_service_1.BookService.deleteBook(id, user);
        res.status(http_status_1.default.OK).json({
            success: true,
            statusCode: http_status_1.default.OK,
            message: "Book deleted successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const getAllBooks = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filters = (0, pick_1.default)(req.query, book_constant_1.bookFilterableFields);
        const page = Number(req.query.page || 1);
        const limit = Number(req.query.limit || 1000);
        const skip = (page - 1) * limit;
        const sortBy = req.query.sortBy || "";
        const sortOrder = req.query.sortOrder || "asc";
        const result = yield book_service_1.BookService.getAllBooks(skip, limit, sortBy, sortOrder, filters);
        res.status(http_status_1.default.OK).json({
            success: true,
            statusCode: http_status_1.default.OK,
            message: "Books retrieved successfully",
            meta: {
                page,
                limit,
                count: result.count,
            },
            data: result.result,
        });
    }
    catch (error) {
        next(error);
    }
});
const getHomeBooks = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = 1;
        const limit = 10;
        // const skip = (page - 1) * limit;
        const sortBy = "createdAt";
        const sortOrder = "desc";
        const result = yield book_service_1.BookService.getHomeBooks(limit, sortBy, sortOrder);
        res.status(http_status_1.default.OK).json({
            success: true,
            statusCode: http_status_1.default.OK,
            message: "Books retrieved successfully",
            meta: {
                page,
                limit,
            },
            data: result.result,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.BookController = {
    createBook,
    getSingleBook,
    updateBook,
    deleteBook,
    getAllBooks,
    getHomeBooks,
    addBookReview,
};
