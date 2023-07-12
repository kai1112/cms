"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../lib/prisma"));
async function create(idUser, idVoucher, title) {
    try {
        let userVoucher = await prisma_1.default.
        ;
    }
    catch (e) {
        return { message: e, status: 404 };
    }
}
//# sourceMappingURL=User_voucherRepo.js.map