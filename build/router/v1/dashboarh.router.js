"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const router = require("express").Router();
const checkLogin_1 = __importDefault(require("../../middleware/checkLogin"));
const dashboarh_controller_1 = __importDefault(require("../../controller/dashboarh.controller"));
router.get("/find-all-user-register", checkLogin_1.default.checkLogin, checkLogin_1.default.checkRoleAdmin, dashboarh_controller_1.default.getAllUsers);
router.get("/find-user-register-by-month", checkLogin_1.default.checkLogin, checkLogin_1.default.checkRoleAdmin, dashboarh_controller_1.default.getUserLoginByMonth);
router.get("/find-user-login-by-month", checkLogin_1.default.checkLogin, checkLogin_1.default.checkRoleAdmin, dashboarh_controller_1.default.getUserRegisterByMonth);
exports.default = router;
//# sourceMappingURL=dashboarh.router.js.map