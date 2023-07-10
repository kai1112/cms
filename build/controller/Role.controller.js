"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RoleRepo_1 = __importDefault(require("../repository/RoleRepo"));
async function create(req, res) {
    try {
        if (!req.body.code) {
            return res.json({ message: "code not found" });
        }
        let data = await RoleRepo_1.default.create(req.body);
        return res.json(data);
    }
    catch (e) {
        return res.json({ message: e, status: 404 });
    }
}
async function findById(req, res) {
    try {
        if (!req.params.id) {
            return res.json({ message: "id not found" });
        }
        let data = await RoleRepo_1.default.findById(Number(req.params.id));
        return res.json(data);
    }
    catch (e) {
        return res.json({ message: e, status: 404 });
    }
}
async function findAllRole(req, res) {
    try {
        let data = await RoleRepo_1.default.findAllRole();
        return res.json(data);
    }
    catch (e) {
        return res.json({ message: e, status: 404 });
    }
}
async function update(req, res) {
    try {
        if (!req.params.id) {
            return res.json({ message: "id not found" });
        }
        let data = await RoleRepo_1.default.update(Number(req.params.id), req.body.code);
        return res.json(data);
    }
    catch (e) {
        return res.json({ message: e, status: 404 });
    }
}
async function remove(req, res) {
    try {
        if (!req.params.id) {
            return res.json({ message: "id not found" });
        }
        let data = await RoleRepo_1.default.remove(Number(req.params.id));
        return res.json(data);
    }
    catch (e) {
        return res.json(e);
    }
}
exports.default = {
    create,
    update,
    remove,
    findAllRole,
    findById,
};
//# sourceMappingURL=Role.controller.js.map