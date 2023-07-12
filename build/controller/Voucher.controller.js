"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const VoucherRepo_1 = __importDefault(require("../repository/VoucherRepo"));
async function create(req, res) {
    try {
        let user = req.user;
        if (!req.body.name) {
            return res.json({ message: "user name is required", status: 404 });
        }
        if (!req.body.title) {
            return res.json({ message: "voucher title is required", status: 404 });
        }
        if (!req.body.expired) {
            return res.json({ message: "expired date is required", status: 404 });
        }
        if (!req.body.type) {
            return res.json({ message: "voucher type is required", status: 404 });
        }
        let voucher = await VoucherRepo_1.default.create(user.id, req.body);
        console.log(21, voucher);
        if (voucher.status !== 200) {
            return res.json({ message: voucher.message, status: voucher.status });
        }
        return res.json({
            message: voucher.message,
            status: voucher.status,
            data: voucher.data,
        });
    }
    catch (error) {
        res.json({ message: error, status: 404 });
    }
}
async function findAllVouchers(req, res) {
    try {
        let vouchers = await VoucherRepo_1.default.findall();
        if (vouchers.status !== 200) {
            return res.json({ message: vouchers.message, status: vouchers.status });
        }
        return res.json({
            message: vouchers.message,
            status: vouchers.status,
            data: vouchers.data,
        });
    }
    catch (error) {
        res.json({ message: error, status: 404 });
    }
}
async function findVoucherById(req, res) {
    try {
        if (!req.params.id) {
            return res.json({ message: "id is required", status: 404 });
        }
        let voucher = await VoucherRepo_1.default.findById(Number(req.params.id));
        if (voucher.status !== 200) {
            return res.json({ message: voucher.message, status: voucher.status });
        }
        return res.json({
            message: voucher.message,
            status: voucher.status,
            data: voucher.data,
        });
    }
    catch (error) {
        res.json({ message: error, status: 404 });
    }
}
async function findName(req, res) {
    try {
        if (!req.body.name) {
            return res.json({ message: "user name is required", status: 404 });
        }
        let voucher = await VoucherRepo_1.default.findName(req.body.name);
        if (voucher.status !== 200) {
            return res.json({ message: voucher.message, status: voucher.status });
        }
        return res.json({
            message: voucher.message,
            status: voucher.status,
            data: voucher.data,
        });
    }
    catch (error) {
        res.json({ message: error, status: 404 });
    }
}
async function update(req, res) {
    try {
        let user = req.user;
        if (!req.params.id) {
            return res.json({ message: "id is required", status: 404 });
        }
        if (!req.body.amount) {
            return res.json({ message: "amount is required", status: 404 });
        }
        let voucher = await VoucherRepo_1.default.update(user.id, Number(req.params.id), req.body.amount);
        if (voucher.status !== 200) {
            return res.json({ message: voucher.message, status: voucher.status });
        }
        return res.json({
            message: voucher.message,
            status: voucher.status,
            data: voucher.data,
        });
    }
    catch (error) {
        res.json({ message: error, status: 404 });
    }
}
exports.default = {
    create,
    findAllVouchers,
    findVoucherById,
    findName,
    update,
};
//# sourceMappingURL=Voucher.controller.js.map