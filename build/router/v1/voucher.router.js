"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const router = require("express").Router();
const checkLogin_1 = __importDefault(require("../../middleware/checkLogin"));
const Voucher_controller_1 = __importDefault(require("../../controller/Voucher.controller"));
router.post("/create", checkLogin_1.default.checkLogin, Voucher_controller_1.default.create);
router.get("/get-all-voucher", checkLogin_1.default.checkLogin, Voucher_controller_1.default.findAllVouchers);
router.get("/get-voucher-by-id/:id", checkLogin_1.default.checkLogin, Voucher_controller_1.default.findVoucherById);
router.get("/get-name", checkLogin_1.default.checkLogin, checkLogin_1.default.checkRoleAdmin, Voucher_controller_1.default.findName);
router.put("/update/:id", checkLogin_1.default.checkLogin, Voucher_controller_1.default.update);
exports.default = router;
//# sourceMappingURL=voucher.router.js.map