"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../lib/prisma"));
async function create(idUser, data) {
    try {
        let game = await prisma_1.default.game.create({
            data: {
                name: data.name,
                url: data.url,
                developer: data.developer,
                description: data.description,
                userCreate_id: idUser,
            },
        });
        if (!game) {
            return { message: "Game not created", status: 400 };
        }
        return { message: "success", status: 201, data: game };
    }
    catch (e) {
        return { message: e, status: 404 };
    }
}
async function findName(name) {
    try {
        let game = await prisma_1.default.game.findUnique({
            where: {
                name: name,
            },
        });
        if (!game) {
            return { message: "Game not found", status: 404 };
        }
        return { message: "success", status: 200, data: game };
    }
    catch (e) {
        return { message: e, status: 404 };
    }
}
async function findAll() {
    try {
        let games = await prisma_1.default.game.findMany();
        if (!games) {
            return { message: "Games not found", status: 404 };
        }
        return { message: "success", status: 200, data: games };
    }
    catch (e) {
        return { message: e, status: 404 };
    }
}
async function findById(id) {
    try {
        let game = await prisma_1.default.game.findUnique({
            where: {
                id: id,
            },
        });
        if (!game) {
            return { message: "Game not found", status: 404 };
        }
        return { message: "success", status: 200, data: game };
    }
    catch (e) {
        return { message: e, status: 404 };
    }
}
async function remove(idUser, id) {
    try {
        let game = await prisma_1.default.game.update({
            where: {
                id: id,
            },
            data: {
                status: 1,
                userDelete_id: idUser,
            },
        });
        if (!game) {
            return { message: "Game not removed", status: 404 };
        }
        return { message: "Game removed", status: 200, data: game };
    }
    catch (e) {
        return { message: e, status: 404 };
    }
}
async function handleDescription(idUser, id, description) {
    try {
        let game = await prisma_1.default.game.update({
            where: {
                id: id,
            },
            data: {
                userUpdate_id: idUser,
                description: description,
            },
        });
        if (!game) {
            return { message: "Game not updated", status: 404 };
        }
        return { message: "update success", status: 200, data: game };
    }
    catch (e) {
        return { message: e, status: 404 };
    }
}
async function handleDeveloper(idUser, id, developer) {
    try {
        let game = await prisma_1.default.game.update({
            where: {
                id: id,
            },
            data: {
                userUpdate_id: idUser,
                developer: developer,
            },
        });
    }
    catch (e) {
        return { message: e, status: 404 };
    }
}
exports.default = {
    create,
    findName,
    findAll,
    findById,
    remove,
    handleDescription,
    handleDeveloper,
};
//# sourceMappingURL=GameRepo.js.map