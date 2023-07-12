"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../lib/prisma"));
async function create(idUser, idCategory, title) {
    try {
        let user_game = await prisma_1.default.user_update_category.create({
            data: {
                title: title,
                user_id: idUser,
                category_id: idCategory,
            }
        });
        if (!user_game) {
            return { message: 'update idCategory failed', status: 404 };
        }
        return { message: 'create success', status: 200 };
    }
    catch (e) {
        return { message: e, status: 404 };
    }
}
exports.default = { create };
//# sourceMappingURL=User_categoryRepo.js.map