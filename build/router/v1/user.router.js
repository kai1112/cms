"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const router = require("express").Router();
const checkLogin_1 = __importDefault(require("../../middleware/checkLogin"));
const User_controller_1 = __importDefault(require("../../controller/User.controller"));
router.post("/signup", User_controller_1.default.signUp);
router.post("/login", User_controller_1.default.login);
router.get("/get-user/:id", checkLogin_1.default.checkLogin, User_controller_1.default.getUserById);
router.get("/get-all-user", checkLogin_1.default.checkLogin, checkLogin_1.default.checkRoleAdmin, User_controller_1.default.getAllUsers);
router.post("/handle-user", checkLogin_1.default.checkLogin, User_controller_1.default.handleUser);
router.post("/handle-password", checkLogin_1.default.checkLogin, User_controller_1.default.handlePassword);
router.delete("/delete-user/:id", checkLogin_1.default.checkLogin, checkLogin_1.default.checkRoleAdmin, User_controller_1.default.removeUserById);
exports.default = router;
//# sourceMappingURL=user.router.js.map