"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../lib/prisma"));
const User_voucherRepo_1 = __importDefault(require("./User_voucherRepo"));
async function create(idUser, data) {
    try {
        let voucher = await findName(data.name);
        if (voucher.status === 200) {
            return { message: "Voucher đã tồn tại", status: 404 };
        }
        // console.log(11, data.name);
        let createVoucher = await prisma_1.default.voucher.create({
            data: {
                name: data.name,
                title: data.title,
                expired: new Date(data.expired),
                type: data.type,
                amount: Number(data.amount),
                userCreate_id: idUser,
            },
        });
        if (!createVoucher) {
            return { message: "create failed", status: 404 };
        }
        return { message: "create succeeded", status: 200, data: createVoucher };
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
        return { message: "Voucher is already", status: 200, data: voucher };
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
        return { message: "success", status: 200, data: voucher };
    }
    catch (e) {
        return { message: e, status: 404 };
    }
}
async function findall() {
    try {
        let voucher = await prisma_1.default.voucher.findMany();
        if (!voucher) {
            return { message: "Voucher not found", status: 404 };
        }
        return { message: 'success', status: 200, data: voucher };
    }
    catch (e) {
        return { message: e, status: 404 };
    }
}
async function update(idUser, id, amount) {
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
        let updateVoucher = await User_voucherRepo_1.default.create(idUser, update.id, `user update ${amount}`);
        if (updateVoucher.status !== 200) {
            return { message: "logged user voucher failed", status: 404 };
        }
        return { message: "update succeeded", status: 200, data: updateVoucher };
    }
    catch (e) {
        return { message: e, status: 404 };
    }
}
exports.default = {
    create,
    findById,
    update,
    findName,
    findall,
};
//# sourceMappingURL=VoucherRepo.js.map