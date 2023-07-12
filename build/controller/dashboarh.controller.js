"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const log_userRepr_1 = __importDefault(require("../repository/log_userRepr"));
async function getAllUsers(req, res) {
    try {
        let user = await log_userRepr_1.default.allUser();
        if (user.status !== 200) {
            return res.json({ message: user.message, status: user.status });
        }
        return res.json({
            message: user.message,
            status: user.status,
            data: user.data,
        });
    }
    catch (e) {
        return res.json({ message: e, status: 404 });
    }
}
async function getUserRegisterByMonth(req, res) {
    try {
        if (!req.body.dateStart) {
            return res.json({ message: "Date Start is required", status: 404 });
        }
        if (!req.body.dateEnd) {
            return res.json({ message: "Date End is required", status: 404 });
        }
        let user = await log_userRepr_1.default.getUserRegisterByMonth(req.body.dateStart, req.body.dateEnd);
        if (user.status !== 200) {
            return res.json({ message: user.message, status: user.status });
        }
        return res.json({
            message: user.message,
            status: user.status,
            data: user.data,
        });
    }
    catch (e) {
        return res.json({ message: e, status: 404 });
    }
}
async function getUserLoginByMonth(req, res) {
    try {
        console.log(48, req.body);
        if (!req.body.dateStart) {
            return res.json({ message: "Date Start is required", status: 404 });
        }
        if (!req.body.dateEnd) {
            return res.json({ message: "Date End is required", status: 404 });
        }
        let user = await log_userRepr_1.default.getUserLoginByMonth(req.body.dateStart, req.body.dateEnd);
        if (user.status !== 200) {
            return res.json({ message: user.message, status: user.status });
        }
        return res.json({
            message: user.message,
            status: user.status,
            data: user.data,
        });
    }
    catch (e) {
        return res.json({ message: e, status: 404 });
    }
}
exports.default = {
    getUserLoginByMonth,
    getUserRegisterByMonth,
    getAllUsers,
};
//# sourceMappingURL=dashboarh.controller.js.map