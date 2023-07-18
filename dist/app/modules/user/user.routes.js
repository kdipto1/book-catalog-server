"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const roles_1 = require("../../../enums/roles");
const router = express_1.default.Router();
router.post("/auth/signup", user_controller_1.UserController.createUser);
router.post("/auth/login", user_controller_1.UserController.loginUser);
router.post("/auth/refresh-token", user_controller_1.UserController.refreshToken);
router.patch("/user/wishlist", (0, auth_1.default)(roles_1.ENUM_USER_ROLE.USER), user_controller_1.UserController.addBookToWishlist);
router.get("/user/wishlist", (0, auth_1.default)(roles_1.ENUM_USER_ROLE.USER), user_controller_1.UserController.getWishlist);
router.patch("/user/readingList", (0, auth_1.default)(roles_1.ENUM_USER_ROLE.USER), user_controller_1.UserController.addBookToReadingList);
router.patch("/user/readingState/:id", (0, auth_1.default)(roles_1.ENUM_USER_ROLE.USER), user_controller_1.UserController.bookReadingState);
router.patch("/user/finishState/:id", (0, auth_1.default)(roles_1.ENUM_USER_ROLE.USER), user_controller_1.UserController.bookFinishState);
router.get("/user/readingList", (0, auth_1.default)(roles_1.ENUM_USER_ROLE.USER), user_controller_1.UserController.getReadingList);
/* ------------------------------------- */
router.get("/users/my-profile", (0, auth_1.default)(roles_1.ENUM_USER_ROLE.USER)
// UserController.getMyProfile
);
router.patch("/users/my-profile", (0, auth_1.default)(roles_1.ENUM_USER_ROLE.USER)
// UserController.updateMyProfile
);
router.get("/users/:id", (0, auth_1.default)(roles_1.ENUM_USER_ROLE.USER)
// UserController.getSingleUser
);
router.patch("/users/:id", (0, auth_1.default)(roles_1.ENUM_USER_ROLE.USER)
// UserController.updateUser
);
router.delete("/users/:id", (0, auth_1.default)(roles_1.ENUM_USER_ROLE.USER)
// UserController.deleteUser
);
router.get("/users", (0, auth_1.default)(roles_1.ENUM_USER_ROLE.ADMIN), user_controller_1.UserController.getAllUsers);
exports.UserRoutes = router;
