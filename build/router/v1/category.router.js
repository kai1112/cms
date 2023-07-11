"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const router = require("express").Router();
const checkLogin_1 = __importDefault(require("../../middleware/checkLogin"));
const Category_controller_1 = __importDefault(require("../../controller/Category.controller"));
router.post("/create", checkLogin_1.default.checkLogin, checkLogin_1.default.checkRoleAdmin, Category_controller_1.default.create);
router.get("/find-name", Category_controller_1.default.findName);
router.get("/find-all", Category_controller_1.default.findAll);
router.put("/update-name/:id", checkLogin_1.default.checkLogin, checkLogin_1.default.checkRoleAdmin, Category_controller_1.default.handleName);
router.put("/update-status/:id", checkLogin_1.default.checkLogin, checkLogin_1.default.checkRoleAdmin, Category_controller_1.default.handleStatus);
router.put("/update-isPushlished/:id", checkLogin_1.default.checkLogin, checkLogin_1.default.checkRoleAdmin, Category_controller_1.default.handleIsPushlished);
exports.default = router;
//# sourceMappingURL=category.router.js.map