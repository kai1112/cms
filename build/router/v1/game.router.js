"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const router = require("express").Router();
const checkLogin_1 = __importDefault(require("../../middleware/checkLogin"));
const Game_controller_1 = __importDefault(require("../../controller/Game.controller"));
router.post("/create", checkLogin_1.default.checkLogin, checkLogin_1.default.checkRoleAdmin, Game_controller_1.default.create);
router.get("/find-name", Game_controller_1.default.findGameByName);
router.get("/find-all", Game_controller_1.default.findAll);
router.put("/update-description/:id", checkLogin_1.default.checkLogin, checkLogin_1.default.checkRoleAdmin, Game_controller_1.default.handleDescription);
router.put("/update-developer/:id", checkLogin_1.default.checkLogin, checkLogin_1.default.checkRoleAdmin, Game_controller_1.default.handleDeveloper);
router.delete("/delete/:id", checkLogin_1.default.checkLogin, checkLogin_1.default.checkRoleAdmin, Game_controller_1.default.remove);
exports.default = router;
//# sourceMappingURL=game.router.js.map