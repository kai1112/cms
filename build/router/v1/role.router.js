"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const router = require("express").Router();
const checkLogin_1 = __importDefault(require("../../middleware/checkLogin"));
const Role_controller_1 = __importDefault(require("../../controller/Role.controller"));
router.post("/create", checkLogin_1.default.checkLogin, checkLogin_1.default.checkRoleAdmin, Role_controller_1.default.create);
router.get("/find-by-id/:id", checkLogin_1.default.checkLogin, checkLogin_1.default.checkRoleAdmin, Role_controller_1.default.findById);
router.get("/find-all", checkLogin_1.default.checkLogin, checkLogin_1.default.checkRoleAdmin, Role_controller_1.default.findAllRole);
router.put("/update/:id", checkLogin_1.default.checkLogin, checkLogin_1.default.checkRoleAdmin, Role_controller_1.default.update);
router.delete("/delete/:id", checkLogin_1.default.checkLogin, checkLogin_1.default.checkRoleAdmin, Role_controller_1.default.remove);
exports.default = router;
//# sourceMappingURL=role.router.js.map