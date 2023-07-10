"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../lib/prisma"));
const bcrypt_1 = __importDefault(require("bcrypt"));
async function create(User) {
    try {
        let data = await prisma_1.default.user.create({
            data: {
                userName: User.userName,
                password: User.password,
                nickName: User.nickName,
                avatar: User.avatar,
                phoneNumber: User.phoneNumber,
                email: User.email,
                role_id: Number(User.role_id),
            },
        });
        if (!data) {
            return { message: "fail to create user", status: 404 };
        }
        return {
            message: "success",
            status: 200,
            data: data,
        };
    }
    catch (e) {
        return { message: e, status: 404 };
    }
}
async function findByUserName(userName) {
    try {
        let data = await prisma_1.default.user.findFirst({
            where: {
                userName: userName,
            },
        });
        if (!data) {
            return { message: "fail to find user", status: 404 };
        }
        return { messaage: "success", status: 200, data: data };
    }
    catch (e) {
        return { message: e, status: 404 };
    }
}
async function findById(id) {
    try {
        let data = await prisma_1.default.user.findFirst({
            where: {
                id: id,
            },
            select: {
                id: true,
                userName: true,
                phoneNumber: true,
                email: true,
                Role: {
                    select: {
                        code: true,
                    },
                },
            },
        });
        if (!data) {
            return { message: "fail to find user", status: 404 };
        }
        return { messaage: "success", status: 200, data: data };
    }
    catch (e) {
        return { message: e, status: 404 };
    }
}
async function updateToken(id, accessToken, refreshToken) {
    try {
        let user = await prisma_1.default.user.update({
            where: {
                id: id,
            },
            data: {
                accesstoken: accessToken,
                refreshtoken: refreshToken,
            },
        });
        if (!user) {
            return { message: "update fail", status: 404 };
        }
    }
    catch (e) {
        return { message: e, status: 404 };
    }
}
async function deleteById(id) {
    try {
        let user = await prisma_1.default.user.delete({
            where: {
                id: id,
            },
        });
        if (!user) {
            return { message: "delete fail", status: 404 };
        }
        return { messaage: "success", status: 200, data: user };
    }
    catch (e) {
        return { message: e, status: 404 };
    }
}
async function findAll() {
    try {
        let data = await prisma_1.default.user.findMany({
            select: {
                id: true,
                nickName: true,
                avatar: true,
                phoneNumber: true,
                email: true,
                Role: {
                    select: {
                        code: true,
                    },
                },
            },
        });
        if (!data) {
            return { message: "fail to find user", status: 404 };
        }
        return { messaage: "success", status: 200, data: data };
    }
    catch (e) {
        return { message: e, status: 404 };
    }
}
async function handlePassword(id, newPassword) {
    try {
        let passwordHash = await bcrypt_1.default.hash(newPassword, 10);
        let user = await prisma_1.default.user.update({
            where: {
                id: id,
            },
            data: {
                password: passwordHash
            }
        });
        if (!user) {
            return { message: "update fail", status: 404 };
        }
        return { messaage: "success", status: 200, data: user };
    }
    catch (e) {
        return { message: e, status: 404 };
    }
}
async function handleNickName(id, nickName) {
    try {
        console.log(162, id, nickName);
        let user = await prisma_1.default.user.update({
            where: {
                id: id,
            },
            data: {
                nickName: nickName
            }
        });
        if (!user) {
            return { message: "update fail", status: 404 };
        }
        return { messaage: "success", status: 200, data: user };
    }
    catch (e) {
        return { message: e, status: 404 };
    }
}
async function handleAvatar(id, avatar) {
    try {
        let user = await prisma_1.default.user.update({
            where: {
                id: id,
            },
            data: {
                avatar: avatar
            }
        });
        if (!user) {
            return { message: "update fail", status: 404 };
        }
        return { messaage: "success", status: 200, data: user };
    }
    catch (e) {
        return { message: e, status: 404 };
    }
}
async function handlePhoneNumber(id, phoneNumber) {
    try {
        let user = await prisma_1.default.user.update({
            where: {
                id: id,
            },
            data: {
                phoneNumber: phoneNumber
            }
        });
        if (!user) {
            return { message: "update fail", status: 404 };
        }
        return { messaage: "success", status: 200, data: user };
    }
    catch (e) {
        return { message: e, status: 404 };
    }
}
async function handleEmail(id, email) {
    try {
        let user = await prisma_1.default.user.update({
            where: {
                id: id,
            },
            data: {
                email: email
            }
        });
        if (!user) {
            return { message: "update fail", status: 404 };
        }
        return { messaage: "success", status: 200, data: user };
    }
    catch (e) {
        return { message: e, status: 404 };
    }
}
exports.default = {
    create,
    findByUserName,
    findById,
    updateToken,
    findAll,
    deleteById,
    handlePassword,
    handleAvatar,
    handleEmail,
    handlePhoneNumber,
    handleNickName
};
//# sourceMappingURL=UserRepo.js.map