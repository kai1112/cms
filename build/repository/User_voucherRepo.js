"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../lib/prisma"));
async function create(idUser, idVoucher, title) {
    try {
        let userVoucher = await prisma_1.default.user_voucher.create({
            data: {
                user_id: idUser,
                voucher_id: idVoucher,
                title: title,
            },
        });
        if (!userVoucher) {
            return { message: "create user voucher failed", stauts: 404 };
        }
        return { message: "create user voucher succeeded", stauts: 200 };
    }
    catch (e) {
        return { message: e, status: 404 };
    }
}
exports.default = { create };
//# sourceMappingURL=User_voucherRepo.js.map