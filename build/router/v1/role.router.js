"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const router = require("express").Router();
const Role_controller_1 = __importDefault(require("../../controller/Role.controller"));
router.post('/create', Role_controller_1.default.create);
router.get('/find-by-id/:id', Role_controller_1.default.findById);
router.get('/find-all', Role_controller_1.default.findAllRole);
router.put('/update/:id', Role_controller_1.default.update);
router.delete('/delete/:id', Role_controller_1.default.remove);
exports.default = router;
//# sourceMappingURL=role.router.js.map