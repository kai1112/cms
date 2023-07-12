"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../lib/prisma"));
async function allUser() {
    try {
        let allUser = await prisma_1.default.user.findMany();
        if (!allUser.length) {
            return { message: "User not found", status: 404 };
        }
        return { message: "success", status: 200, data: allUser };
    }
    catch (e) {
        return { message: e, status: 404 };
    }
}
async function getUserRegisterByMonth(dateStart, dateEnd) {
    try {
        let registerByMonth = await prisma_1.default.user.findMany({
            where: {
                createdAt: {
                    gte: new Date(dateStart),
                    lte: new Date(dateEnd),
                },
            },
        });
        if (!registerByMonth.length) {
            return { message: "User not found", status: 404 };
        }
        return { message: "success", status: 200, data: registerByMonth };
    }
    catch (e) {
        return { message: e, status: 404 };
    }
}
async function getUserLoginByMonth(dateStart, dateEnd) {
    try {
        let loginByMonth = await prisma_1.default.loginLog.findMany({
            where: {
                createdAt: {
                    gte: new Date(dateStart),
                    lte: new Date(dateEnd),
                },
            },
        });
        if (!loginByMonth.length) {
            return { message: "User not found", status: 404 };
        }
        return { message: "success", status: 200, data: loginByMonth };
    }
    catch (e) {
        return { message: e, status: 404 };
    }
}
exports.default = {
    allUser,
    getUserRegisterByMonth,
    getUserLoginByMonth,
};
//# sourceMappingURL=log_userRepr.js.map