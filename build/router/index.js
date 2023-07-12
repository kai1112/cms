"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const router = require('express').Router();
const role_router_1 = __importDefault(require("../router/v1/role.router"));
const user_router_1 = __importDefault(require("../router/v1/user.router"));
const category_router_1 = __importDefault(require("../router/v1/category.router"));
const game_router_1 = __importDefault(require("../router/v1/game.router"));
router.use('/api/v1/user', user_router_1.default);
router.use('/api/v1/role', role_router_1.default);
router.use('/api/v1/category', category_router_1.default);
router.use('/api/v1/game', game_router_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map