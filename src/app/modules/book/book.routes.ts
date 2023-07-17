import express from "express";

import auth from "../../middlewares/auth";
import { ENUM_USER_ROLE } from "../../../enums/roles";
import { BookController } from "./book.controller";

const router = express.Router();

router.post("/", auth(ENUM_USER_ROLE.USER), BookController.createBook);
router.get("/", BookController.getAllBooks);
router.get("/homeBooks", BookController.getHomeBooks);
router.get("/:id", BookController.getSingleBook);
router.patch("/:id", auth(ENUM_USER_ROLE.USER), BookController.updateBook);
router.patch(
  "/addReview/:id",
  auth(ENUM_USER_ROLE.USER),
  BookController.addBookReview
);
router.delete("/:id", auth(ENUM_USER_ROLE.USER), BookController.deleteBook);

export const BookRoutes = router;
