"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../lib/prisma"));
async function create(idUser, data) {
    try {
        let voucher = await findName(data.name);
        if (voucher.status === 200) {
            throw new Error("Voucher already exists");
        }
        let create = await prisma_1.default.voucher.create({
            data: {
                name: data.name,
                title: data.title,
                expored: data.expored,
                type: data.type,
                userCreate_id: idUser,
            },
        });
        if (!create) {
            return { message: "create failed0, status: 404" };
        }
        return { message: "create succeeded", status: 200 };
    }
    catch (e) {
        return { message: e, status: 404 };
    }
}
async function findName(name) {
    try {
        let voucher = await prisma_1.default.voucher.findFirst({
            where: {
                name: name,
            },
        });
        if (!voucher) {
            return { message: "Voucher not found", status: 404 };
        }
        return { message: "Voucher is already", status: 200 };
    }
    catch (e) {
        return { message: e, status: 404 };
    }
}
async function findById(id) {
    try {
        let voucher = await prisma_1.default.voucher.findFirst({
            where: {
                id: id,
            },
        });
        if (!voucher) {
            return { message: "Voucher not found", status: 404 };
        }
        return { message: voucher, status: 200 };
    }
    catch (e) {
        return { message: e, status: 404 };
    }
}
async function update(id, amount) {
    try {
        let update = await prisma_1.default.voucher.update({
            where: {
                id: id,
            },
            data: {
                amount: amount,
            },
        });
        if (!update) {
            return { message: "update failed", status: 404 };
        }
        return { message: "update succeeded", status: 200 };
    }
    catch (e) {
        return { message: e, status: 404 };
    }
}
//# sourceMappingURL=VoucherRepo.js.map