"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../lib/prisma"));
const Category_GameRepo_1 = __importDefault(require("../repository/Category_GameRepo"));
const User_gameRepo_1 = __importDefault(require("../repository/User_gameRepo"));
async function create(idUser, data, category) {
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
        let category_Game = await Category_GameRepo_1.default.create(Number(game.id), category);
        console.log(20, category_Game);
        if ((category_Game === null || category_Game === void 0 ? void 0 : category_Game.status) === 404) {
            return { message: "create category game faild" };
        }
        return { message: "success", status: 200, data: game };
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
                // userUpdate_id: idUser,
                description: description,
            },
        });
        if (!game) {
            return { message: "Game not updated", status: 404 };
        }
        let update = await User_gameRepo_1.default.create(idUser, game.id, "update description");
        if (update.status !== 200) {
            return { message: "logged user update game failed", status: 404 };
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
                // userUpdate_id: idUser,
                developer: developer,
            },
        });
        if (!game) {
            return { message: "Game not updated", status: 404 };
        }
        let update = await User_gameRepo_1.default.create(idUser, game.id, "update developer");
        if (update.status !== 200) {
            return { message: "logged user update game failed", status: 404 };
        }
        return { message: "update success", status: 200, data: game };
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