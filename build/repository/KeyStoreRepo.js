"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../lib/prisma"));
async function create(user_id, primaryKey, secondaryKey) {
    try {
        let keyStore = await prisma_1.default.keyStore.create({
            data: {
                user_id: user_id,
                primaryKey: primaryKey,
                secondaryKey: secondaryKey,
            },
        });
        if (!keyStore) {
            return { message: "create keystore failed", status: 404 };
        }
        return { nessage: "create keystore success", status: 200, data: keyStore };
    }
    catch (e) {
        return { message: e, status: 404 };
    }
}
async function findForKey(user_id, key) {
    try {
        let data = await prisma_1.default.keyStore.findFirst({
            where: {
                user_id: user_id,
                primaryKey: key,
            },
        });
        if (!data) {
            return { message: "keystore not found", status: 404 };
        }
        return { message: "success", status: 200, data: data };
    }
    catch (e) {
        return { message: e, status: 404 };
    }
}
async function find(user_id, primaryKey, secondaryKey) {
    try {
        let data = await prisma_1.default.keyStore.findFirst({
            where: {
                user_id: user_id,
                primaryKey: primaryKey,
                secondaryKey: secondaryKey,
            },
        });
        if (!data) {
            return { message: "keystore not found", status: 404 };
        }
        return { message: "success", status: 200, data: data };
    }
    catch (e) {
        return { message: e, status: 404 };
    }
}
async function remove(id) {
    try {
        let data = await prisma_1.default.keyStore.delete({
            where: {
                id: id,
            },
        });
        if (!data) {
            return { message: "keystore not found", status: 404 };
        }
        return { message: "success", status: 200, data: data };
    }
    catch (e) {
        return { message: e, status: 404 };
    }
}
async function removeAllForUser(user_id) {
    try {
        let data = await prisma_1.default.keyStore.deleteMany({
            where: {
                user_id: user_id,
            },
        });
        if (!data) {
            return { message: "keystore not found", status: 404 };
        }
        return { message: "success", status: 200, data: data };
    }
    catch (e) {
        return { message: e, status: 404 };
    }
}
exports.default = {
    create,
    findForKey,
    find,
    remove,
    removeAllForUser,
};
//# sourceMappingURL=KeyStoreRepo.js.map