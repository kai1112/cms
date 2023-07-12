"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../lib/prisma"));
async function create(idGame, category) {
    try {
        for (let i = 0; i < category.length; i++) {
            let category_game = await prisma_1.default.category_Game.findFirst({
                where: {
                    game_id: idGame,
                    category_id: category[i],
                },
            });
            if (category_game) {
                return {
                    status: 400,
                    message: "This game already has this category game",
                };
            }
        }
        let category_Game;
        for (let i = 0; i < category.length; i++) {
            category_Game = await prisma_1.default.category_Game.create({
                data: {
                    game_id: idGame,
                    category_id: category[i],
                },
            });
            if (!category_Game) {
                return {
                    status: 400,
                    message: "Error creating category game",
                };
            }
        }
        return {
            status: 200,
            message: "Category game created",
            data: category_Game,
        };
    }
    catch (e) {
        return { message: "Error creating", status: 404 };
    }
}
exports.default = { create };
//# sourceMappingURL=Category_GameRepo.js.map