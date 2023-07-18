"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const roles_1 = require("../../../enums/roles");
const book_controller_1 = require("./book.controller");
const router = express_1.default.Router();
router.post("/", (0, auth_1.default)(roles_1.ENUM_USER_ROLE.USER), book_controller_1.BookController.createBook);
router.get("/", book_controller_1.BookController.getAllBooks);
router.get("/homeBooks", book_controller_1.BookController.getHomeBooks);
router.get("/:id", book_controller_1.BookController.getSingleBook);
router.patch("/:id", (0, auth_1.default)(roles_1.ENUM_USER_ROLE.USER), book_controller_1.BookController.updateBook);
router.patch("/addReview/:id", (0, auth_1.default)(roles_1.ENUM_USER_ROLE.USER), book_controller_1.BookController.addBookReview);
router.delete("/:id", (0, auth_1.default)(roles_1.ENUM_USER_ROLE.USER), book_controller_1.BookController.deleteBook);
exports.BookRoutes = router;
