import { Request, Response } from "express";
import User from "../interface/User";
import UserRepo from "../repository/UserRepo";
import bcrypt from "bcrypt";
import { promisify } from "util";
import { readFile } from "fs";
import path from "path";
import { ProtectedRequest } from "app-requst";
const jwt = require("jsonwebtoken");

async function signUp(req: Request, res: Response) {
  try {
    let user = await UserRepo.findByUserName(req.body.userName);
    if (user.status === 200) {
      return res.json({
        message: "User already exists",
        status: 404,
      });
    }
    const passwordHash = await bcrypt.hash(req.body.password, 10);

    let userCreate = await UserRepo.create({
      userName: req.body.userName,
      password: passwordHash,
      nickName: req.body.nickName,
      avatar: req.body.avatar,
      role_id: req.body.role_id,
    } as User);

    return res.json({
      message: "creaete sucessfully",
      status: 200,
      data: {
        user: userCreate,
      },
    });
  } catch (e) {
    return res.json({ message: e, status: 404 });
  }
}

async function login(req: Request, res: Response) {
  try {
    let user = await UserRepo.findByUserName(req.body.userName);
    if (user.status !== 200) {
      return res.json({
        message: "user name is not valid",
        status: 404,
      });
    }

    const password = await bcrypt.compare(
      req.body.password,
      user.data.password
    );
    if (!password) {
      return res.json({
        message: "password is not valid",
        status: 404,
      });
    }
    let primaryKey = await promisify(readFile)(
      path.join(__dirname, "../../keys/private.pem"),
      "utf8"
    );

    let accessToken = jwt.sign(
      { data: { id: user.data.id, name: user.data.userName } },
      primaryKey
    );

    let refreshToken = jwt.sign(
      { data: { id: user.data.userName, name: user.data.password } },
      primaryKey
    );
    await UserRepo.updateToken(user.id, accessToken, refreshToken);
    let dataUser = await UserRepo.findByUserName(req.body.userName);
    return res.json({
      message: "login sucessfully",
      status: 200,
      data: dataUser,
      token: {
        accessToken: accessToken,
        refreshToken: refreshToken,
      },
    });
  } catch (e) {
    return res.json({ message: e, status: 404 });
  }
}

async function getUserById(req: Request, res: Response) { 
  try {
      let user = await UserRepo.findById(Number(req.params.id));
      if (user.status!== 200) {
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
    } catch (e) {
      return res.json({ message: e, status: 404 });
    }
}

async function getAllUsers(req: ProtectedRequest, res: Response) {
  try {

    let users = await UserRepo.findAll();
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
  } catch (e) {
    return res.json({ message: e, status: 404 });
  }
}

async function removeUserById(req: Request, res: Response) { 
  try {
      let user = await UserRepo.deleteById(Number(req.params.id));
      if (user.status!== 200) {
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
    } catch (e) {
      return res.json({ message: e, status: 404 });
    }
}

async function handleUser(req: ProtectedRequest, res: Response) { 
  try {
    let user = req.user;
    console.log(153, user)
    if (req.body.nickName) {
      let userUpdate = await UserRepo.handleNickName(Number(user.id), req.body.nickName);
      return res.json({message: "update nick name sucessfully", status: 200, data: userUpdate})
    }
    if (req.body.avatar) {
      let userUpdate = await UserRepo.handleAvatar(Number(user.id), req.body.avatar);
      return res.json({ message: "update avatar sucessfully", status: 200 , data: userUpdate})
    }
    if (req.body.phoneNumber) {
      let userUpdate = await UserRepo.handlePhoneNumber(Number(user.id), req.body.phoneNumber);
      return res.json({ message: "update phone number sucessfully", status: 200 , data: userUpdate})
    }
    if (req.body.email) {
      let userUpdate = await UserRepo.handleEmail(Number(user.id), req.body.email);
      return res.json({ message: "update email sucessfully", status: 200 , data: userUpdate})
    }
  } catch (e) { 
    return res.json({ message: e, status: 404 });
  }
}

export default {
  signUp,
  login,
  getAllUsers,
  removeUserById,
  getUserById,
  handleUser
};
