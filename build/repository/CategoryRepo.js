"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../lib/prisma"));
const User_categoryRepo_1 = __importDefault(require("./User_categoryRepo"));
async function create(idUser, data) {
    try {
        console.log(14, idUser, data);
        let category = await prisma_1.default.category.create({
            data: {
                name: data.name,
                status: Boolean(data.status),
                isPushlished: Boolean(data.isPushlished),
                userCreate_id: Number(idUser),
            },
        });
        if (!category) {
            return { message: "category not created", status: 404 };
        }
        return { message: "success", status: 200, data: category };
    }
    catch (e) {
        return { message: e, status: 404 };
    }
}
async function findName(name) {
    try {
        let category = await prisma_1.default.category.findFirst({
            where: {
                name: name,
            },
        });
        if (!category) {
            return { message: "category not found", status: 404 };
        }
        return { message: "success", status: 200, data: category };
    }
    catch (e) {
        return { message: e, status: 404 };
    }
}
async function findAll() {
    try {
        let category = await prisma_1.default.category.findMany();
        if (!category) {
            return { message: "category not found", status: 404 };
        }
        return { message: "success", status: 200, data: category };
    }
    catch (e) {
        return { message: e, status: 404 };
    }
}
async function getCategoryById(id) {
    try {
        let category = await prisma_1.default.category.findUnique({
            where: {
                id: id,
            },
        });
        if (!category) {
            return { message: "category not found", status: 404 };
        }
        return { message: "success", status: 200, data: category };
    }
    catch (e) {
        return { message: e, status: 404 };
    }
}
async function handleName(idUser, name, idCategory) {
    try {
        let category = await prisma_1.default.category.update({
            where: {
                id: idCategory,
            },
            data: {
                name: name,
                // userUpdate_id: Number(idUser),
            },
        });
        if (!category) {
            return { message: "category not updated", status: 404 };
        }
        let update = await User_categoryRepo_1.default.create(idUser, category.id, "update name");
        if (update.status !== 200) {
            return { message: "logged user update name category failed", status: 404 };
        }
        return { message: "category updated", status: 200, data: category };
    }
    catch (e) {
        return { message: e, status: 404 };
    }
}
async function handleStatus(idUser, idCategory) {
    var _a;
    try {
        let findCategory = await getCategoryById(idCategory);
        if (findCategory.status !== 200) {
            return { message: findCategory.message, status: findCategory.status };
        }
        let category = await prisma_1.default.category.update({
            where: {
                id: idCategory,
            },
            data: {
                status: !((_a = findCategory.data) === null || _a === void 0 ? void 0 : _a.status),
                // userUpdate_id: Number(idUser),
            },
        });
        let update = await User_categoryRepo_1.default.create(idUser, category.id, "update status");
        if (update.status !== 200) {
            return { message: "logged user update status category failed", status: 404 };
        }
        if (!category) {
            return { message: "category not updated", status: 404 };
        }
        return { message: "category updated", status: 200, data: category };
    }
    catch (e) {
        return { message: e, status: 404 };
    }
}
async function handleIsPushlished(idUser, idCategory) {
    var _a;
    try {
        let findCategory = await getCategoryById(idCategory);
        if (findCategory.status !== 200) {
            return { message: findCategory.message, status: findCategory.status };
        }
        let category = await prisma_1.default.category.update({
            where: {
                id: idCategory
            },
            data: {
                isPushlished: !((_a = findCategory.data) === null || _a === void 0 ? void 0 : _a.isPushlished),
                // userUpdate_id: Number(idUser),
            }
        });
        if (!category) {
            return { message: 'category update failed', status: 200 };
        }
        let update = await User_categoryRepo_1.default.create(idUser, category.id, "update ispushished");
        if (update.status !== 200) {
            return { message: "logged user update ispushished category failed", status: 404 };
        }
        return { message: 'category updated', status: 200, data: category };
    }
    catch (e) {
        return { message: e, status: 404 };
    }
}
exports.default = { create, findAll, findName, handleName, handleIsPushlished, handleStatus };
//# sourceMappingURL=CategoryRepo.js.map