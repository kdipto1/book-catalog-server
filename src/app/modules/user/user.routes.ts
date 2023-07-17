import express from "express";
import { UserController } from "./user.controller";
import auth from "../../middlewares/auth";
import { ENUM_USER_ROLE } from "../../../enums/roles";

const router = express.Router();

router.post("/auth/signup", UserController.createUser);
router.post("/auth/login", UserController.loginUser);
router.post("/auth/refresh-token", UserController.refreshToken);
router.patch(
  "/user/wishlist",
  auth(ENUM_USER_ROLE.USER),
  UserController.addBookToWishlist
);
router.get(
  "/user/wishlist",
  auth(ENUM_USER_ROLE.USER),
  UserController.getWishlist
);

/* ------------------------------------- */
router.get(
  "/users/my-profile",
  auth(ENUM_USER_ROLE.USER)
  // UserController.getMyProfile
);
router.patch(
  "/users/my-profile",
  auth(ENUM_USER_ROLE.USER)
  // UserController.updateMyProfile
);
router.get(
  "/users/:id",
  auth(ENUM_USER_ROLE.USER)
  // UserController.getSingleUser
);
router.patch(
  "/users/:id",
  auth(ENUM_USER_ROLE.USER)
  // UserController.updateUser
);
router.delete(
  "/users/:id",
  auth(ENUM_USER_ROLE.USER)
  // UserController.deleteUser
);
router.get("/users", auth(ENUM_USER_ROLE.ADMIN), UserController.getAllUsers);

export const UserRoutes = router;
