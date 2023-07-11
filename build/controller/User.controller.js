"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserRepo_1 = __importDefault(require("../repository/UserRepo"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const util_1 = require("util");
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const jwt = require("jsonwebtoken");
async function signUp(req, res) {
    try {
        let user = await UserRepo_1.default.findByUserName(req.body.userName);
        if (user.status === 200) {
            return res.json({
                message: "User already exists",
                status: 404,
            });
        }
        const passwordHash = await bcrypt_1.default.hash(req.body.password, 10);
        let userCreate = await UserRepo_1.default.create({
            userName: req.body.userName,
            password: passwordHash,
            nickName: req.body.nickName,
            avatar: req.body.avatar,
            role_id: req.body.role_id,
        });
        return res.json({
            message: "creaete sucessfully",
            status: 200,
            data: {
                user: userCreate,
            },
        });
    }
    catch (e) {
        return res.json({ message: e, status: 404 });
    }
}
async function login(req, res) {
    try {
        let user = await UserRepo_1.default.findByUserName(req.body.userName);
        if (user.status !== 200) {
            return res.json({
                message: "user name is not valid",
                status: 404,
            });
        }
        const password = await bcrypt_1.default.compare(req.body.password, user.data.password);
        if (!password) {
            return res.json({
                message: "password is not valid",
                status: 404,
            });
        }
        let primaryKey = await (0, util_1.promisify)(fs_1.readFile)(path_1.default.join(__dirname, "../../keys/private.pem"), "utf8");
        let accessToken = jwt.sign({ data: { id: user.data.id, name: user.data.userName } }, primaryKey);
        let refreshToken = jwt.sign({ data: { id: user.data.userName, name: user.data.password } }, primaryKey);
        await UserRepo_1.default.updateToken(user.id, accessToken, refreshToken);
        let dataUser = await UserRepo_1.default.findByUserName(req.body.userName);
        return res.json({
            message: "login sucessfully",
            status: 200,
            data: dataUser,
            token: {
                accessToken: accessToken,
                refreshToken: refreshToken,
            },
        });
    }
    catch (e) {
        return res.json({ message: e, status: 404 });
    }
}
async function getUserById(req, res) {
    try {
        let user = await UserRepo_1.default.findById(Number(req.params.id));
        if (user.status !== 200) {
            return res.json({
                message: "user not found",
                status: 404,
            });
        }
        return res.json({
            message: "user found",
            status: 200,
            data: user.data,
        });
    }
    catch (e) {
        return res.json({ message: e, status: 404 });
    }
}
async function getAllUsers(req, res) {
    try {
        let users = await UserRepo_1.default.findAll();
        if (users.status !== 200) {
            return res.json({
                message: "user not found",
                status: 404,
            });
        }
        return res.json({
            message: "get all users sucessfully",
            status: 200,
            data: users,
        });
    }
    catch (e) {
        return res.json({ message: e, status: 404 });
    }
}
async function removeUserById(req, res) {
    try {
        let user = await UserRepo_1.default.deleteById(Number(req.params.id));
        if (user.status !== 200) {
            return res.json({
                message: "user not found",
                status: 404,
            });
        }
        return res.json({
            message: "remove user sucessfully",
            status: 200,
            data: user,
        });
    }
    catch (e) {
        return res.json({ message: e, status: 404 });
    }
}
async function handleUser(req, res) {
    try {
        let user = req.user;
        console.log(153, user);
        if (req.body.nickName) {
            let userUpdate = await UserRepo_1.default.handleNickName(Number(user.id), req.body.nickName);
            return res.json({ message: "update nick name sucessfully", status: 200, data: userUpdate });
        }
        if (req.body.avatar) {
            let userUpdate = await UserRepo_1.default.handleAvatar(Number(user.id), req.body.avatar);
            return res.json({ message: "update avatar sucessfully", status: 200, data: userUpdate });
        }
        if (req.body.phoneNumber) {
            let userUpdate = await UserRepo_1.default.handlePhoneNumber(Number(user.id), req.body.phoneNumber);
            return res.json({ message: "update phone number sucessfully", status: 200, data: userUpdate });
        }
        if (req.body.email) {
            let userUpdate = await UserRepo_1.default.handleEmail(Number(user.id), req.body.email);
            return res.json({ message: "update email sucessfully", status: 200, data: userUpdate });
        }
    }
    catch (e) {
        return res.json({ message: e, status: 404 });
    }
}
exports.default = {
    signUp,
    login,
    getAllUsers,
    removeUserById,
    getUserById,
    handleUser
};
//# sourceMappingURL=User.controller.js.map