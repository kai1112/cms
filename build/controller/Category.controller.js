"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CategoryRepo_1 = __importDefault(require("../repository/CategoryRepo"));
async function create(req, res) {
    try {
        let user = req.user;
        if (!req.body.name) {
            return res.status(400).json({
                message: "Name is required",
            });
        }
        if (!req.body.status) {
            return res.status(400).json({
                message: "status is required",
            });
        }
        if (!req.body.isPushlished) {
            return res.status(400).json({
                message: "isPushlished is required",
            });
        }
        let nameCategory = await CategoryRepo_1.default.findName(req.body.name);
        if (nameCategory.status === 200) {
            return res.json({
                message: "name is already, please try again",
                status: 404,
            });
        }
        let category = await CategoryRepo_1.default.create(Number(user.id), req.body);
        if (category.status !== 200) {
            return res.json({ message: category.message, status: category.status });
        }
        return res.json({
            message: category.message,
            status: category.status,
            data: category.data,
        });
    }
    catch (e) {
        return res.json({ message: e, status: 404 });
    }
}
async function findName(req, res) {
    try {
        if (!req.body.name) {
            return res.json({ message: "name not found", status: 404 });
        }
        let category = await CategoryRepo_1.default.findName(req.body.name);
        if (category.status !== 200) {
            return res.json({ message: category.message, status: category.status });
        }
        return res.json({
            message: category.message,
            status: category.status,
            data: category.data,
        });
    }
    catch (e) {
        res.json({ message: e, status: 404 });
    }
}
async function findAll(req, res) {
    try {
        let category = await CategoryRepo_1.default.findAll();
        if (category.status !== 200) {
            return res.json({ message: category.message, status: category.status });
        }
        return res.json({
            message: category.message,
            status: category.status,
            data: category.data,
        });
    }
    catch (e) {
        res.json({ message: e, status: 404 });
    }
}
async function handleName(req, res) {
    try {
        let user = req.user;
        if (!req.params.id) {
            return res.json({ message: "id category not found", status: 404 });
        }
        if (!req.body.name) {
            return res.json({ message: "Please enter a name", status: 404 });
        }
        let categoryUpdate = await CategoryRepo_1.default.handleName(user.id, req.body.name, Number(req.params.id));
        if (categoryUpdate.status !== 200) {
            return res.json({
                message: categoryUpdate.message,
                status: categoryUpdate.status,
            });
        }
        return res.json({
            message: categoryUpdate.message,
            status: categoryUpdate.status,
            data: categoryUpdate.data,
        });
    }
    catch (e) {
        return res.json({ message: e, status: 404 });
    }
}
async function handleStatus(req, res) {
    try {
        let user = req.user;
        if (!req.params.id) {
            return res.json({ message: "id category not found", status: 404 });
        }
        let category = await CategoryRepo_1.default.handleStatus(user.id, Number(req.params.id));
        if (category.status !== 200) {
            return res.json({ message: category.message, status: category.status });
        }
        return res.json({
            message: category.message,
            status: category.status,
            data: category.data,
        });
    }
    catch (e) {
        return res.json({ message: e, status: 404 });
    }
}
async function handleIsPushlished(req, res) {
    try {
        let user = req.user;
        if (!req.params.id) {
            return res.json({ message: "id category not found", status: 404 });
        }
        let category = await CategoryRepo_1.default.handleIsPushlished(user.id, Number(req.params.id));
        if (category.status !== 200) {
            return res.json({ message: category.message, status: category.status });
        }
        console.log(145, category.data);
        return res.json({ message: category.message, status: category.status, data: category.data });
    }
    catch (e) {
        return res.json({ message: e, status: 404 });
    }
}
exports.default = {
    handleIsPushlished,
    handleName,
    handleStatus,
    create,
    findName,
    findAll,
};
//# sourceMappingURL=Category.controller.js.map