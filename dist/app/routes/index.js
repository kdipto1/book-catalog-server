"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_routes_1 = require("../modules/user/user.routes");
// import { AdminRoutes } from "../modules/admin/admin.routes";
const book_routes_1 = require("../modules/book/book.routes");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: "/",
        route: user_routes_1.UserRoutes,
    },
    // {
    //   path: "/admins",
    //   route: AdminRoutes,
    // },
    {
        path: "/book",
        route: book_routes_1.BookRoutes,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
