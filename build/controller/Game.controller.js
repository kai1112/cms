"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const GameRepo_1 = __importDefault(require("../repository/GameRepo"));
async function create(req, res) {
    try {
        let user = req.user;
        if (!req.body.name)
            return res.json({ message: "name is required", status: 404 });
        if (!req.body.url)
            return res.json({ message: "url is required", status: 404 });
        if (!req.body.developer)
            return res.json({ message: "developer is required", status: 404 });
        if (!req.body.description)
            return res.json({ message: "description is required", status: 404 });
        if (!req.body.category)
            return res.json({ message: "description is required", status: 404 });
        let findGame = await GameRepo_1.default.findName(req.body.name);
        if (findGame.status === 200)
            return res.json({ message: 'name is already', status: findGame.status });
        let game = await GameRepo_1.default.create(user.id, req.body, req.body.category);
        if (game.status !== 200)
            return res.json({ message: game.message, status: game.status });
        return res.json({
            message: game.message,
            status: game.status,
            data: game.data,
        });
    }
    catch (e) {
        return res.json({ message: e, status: 404 });
    }
}
async function findGameByName(request, res) {
    try {
        if (!request.body.name)
            return res.json({ message: "name not found", status: 404 });
        let game = await GameRepo_1.default.findName(request.body.name);
        if (game.status !== 200) {
            return res.json({ message: game.message, status: game.status });
        }
        return res.json({
            message: game.message,
            status: game.status,
            data: game.data,
        });
    }
    catch (e) {
        return res.json({ message: e, status: 404 });
    }
}
async function findAll(req, res) {
    try {
        let game = await GameRepo_1.default.findAll();
        if (game.status !== 200) {
            return res.json({ message: game.message, status: game.status });
        }
        return res.json({
            message: game.message,
            status: game.status,
            data: game.data,
        });
    }
    catch (e) {
        return res.json({ message: e, status: 404 });
    }
}
async function remove(req, res) {
    try {
        let user = req.user;
        if (!req.params.id) {
            return res.json({ message: "id not found", status: 404 });
        }
        let game = await GameRepo_1.default.remove(user.id, Number(req.params.id));
        if (game.status !== 200) {
            return res.json({ message: game.message, status: game.status });
        }
        return res.json({
            message: game.message,
            status: game.status,
            data: game.data,
        });
    }
    catch (e) {
        return res.json({ message: e, status: 404 });
    }
}
async function handleDescription(req, res) {
    try {
        let user = req.user;
        if (!req.params.id) {
            return res.json({ message: "id not found", status: 404 });
        }
        let game = await GameRepo_1.default.handleDescription(user.id, Number(req.params.id), req.body.description);
        if (game.status !== 200) {
            return res.json({ message: game.message, status: game.status });
        }
        return res.json({
            message: game.message,
            status: game.status,
            data: game.data,
        });
    }
    catch (e) {
        return res.json({ message: e, status: 404 });
    }
}
async function handleDeveloper(req, res) {
    try {
        let user = req.user;
        if (!req.params.id) {
            return res.json({ message: "id not found", status: 404 });
        }
        let game = await GameRepo_1.default.handleDeveloper(user.id, Number(req.params.id), req.body.developer);
        if (game.status !== 200) {
            return res.json({ message: game.message, status: game.status });
        }
        return res.json({
            message: game.message,
            status: game.status,
            data: game.data,
        });
    }
    catch (e) {
        return res.json({ message: e, status: 404 });
    }
}
exports.default = {
    create,
    findGameByName,
    findAll,
    remove,
    handleDescription,
    handleDeveloper,
};
//# sourceMappingURL=Game.controller.js.map