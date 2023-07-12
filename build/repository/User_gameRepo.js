"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../lib/prisma"));
async function create(idUser, idGame, title) {
    try {
        let user_game = await prisma_1.default.user_update_game.create({
            data: {
                title: title,
                user_id: idUser,
                game_id: idGame,
            }
        });
        if (!user_game) {
            return { message: 'update game failed', status: 404 };
        }
        return { message: 'create success', status: 200 };
    }
    catch (e) {
        return { message: e, status: 404 };
    }
}
exports.default = { create };
//# sourceMappingURL=User_gameRepo.js.map