import express from "express";

import auth from "../../middlewares/auth";
import { ENUM_USER_ROLE } from "../../../enums/roles";
import { BookController } from "./book.controller";

const router = express.Router();

router.post("/", auth(ENUM_USER_ROLE.USER), BookController.createBook);
router.get("/", auth(ENUM_USER_ROLE.USER), BookController.getAllBooks);
router.get("/:id", auth(ENUM_USER_ROLE.USER), BookController.getSingleBook);
router.patch("/:id", auth(ENUM_USER_ROLE.USER), BookController.updateBook);
router.delete("/:id", auth(ENUM_USER_ROLE.USER), BookController.deleteBook);

export const BookRoutes = router;
