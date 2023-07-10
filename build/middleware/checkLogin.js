"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAccessToken = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const util_1 = require("util");
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const jwt = require("jsonwebtoken");
const getAccessToken = (authorization) => {
    if (!authorization)
        return "Invalid Authorization";
    if (!authorization.startsWith("Bearer "))
        return "Invalid Authorization";
    return authorization.split(" ")[1];
};
exports.getAccessToken = getAccessToken;
async function checkLogin(req, res, next) {
    req.accessToken = (0, exports.getAccessToken)(req.headers.authorization);
    try {
        let primaryKey = await (0, util_1.promisify)(fs_1.readFile)(path_1.default.join(__dirname, "../../keys/private.pem"), "utf8");
        const payload = await jwt.verify(req.accessToken, primaryKey);
        const player = await prisma_1.default.user.findFirst({
            where: {
                id: Number(payload.data.id)
            }
        });
        if (!player)
            return ('User not registered');
        req.user = player;
        return next();
    }
    catch (e) {
        return res.json({ message: 'something went wrong', status: 404 });
    }
}
exports.default = {
    checkLogin
};
//# sourceMappingURL=checkLogin.js.map