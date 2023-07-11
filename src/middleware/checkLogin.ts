import { ProtectedRequest } from "../types/app-requst";
import { NextFunction, Response } from "express";
import prisma from "../lib/prisma";
import { promisify } from "util";
import { readFile } from "fs";
import path from "path";
const jwt = require("jsonwebtoken");

export const getAccessToken = (authorization?: string) => {
  if (!authorization) return "Invalid Authorization";
  if (!authorization.startsWith("Bearer ")) return "Invalid Authorization";

  return authorization.split(" ")[1];
};

async function checkLogin(
  req: ProtectedRequest,
  res: Response,
  next: NextFunction
) {
  req.accessToken = getAccessToken(req.headers.authorization);
  try {
    let primaryKey = await promisify(readFile)(
      path.join(__dirname, "../../keys/private.pem"),
      "utf8"
    );
    const payload = await jwt.verify(req.accessToken, primaryKey);
    const player = await prisma.user.findFirst({
      where: {
        id: Number(payload.data.id),
      },
      include: {
        Role: true,
      },
    });
    if (!player) return "User not registered";
    req.user = player;
    return next();
  } catch (e) {
    return res.json({ message: "something went wrong", status: 404 });
  }
}

async function checkRoleAdmin(
  req: ProtectedRequest,
  res: Response,
  next: NextFunction
): Promise<any> {
    try {
    if (req.user.Role.code == 0) {
      return next();
    } else {
      res.status(403).json({ message: "role is not allowed" });
    }
  } catch (e) {
    return res.json({ message: "something went wrong", status: 404 });
  }
}

async function checkRoleBrands(
  req: ProtectedRequest,
  res: Response,
  next: NextFunction
): Promise<any> {
  try {
    if (req.user.Role.code == 1) {
      return next();
    } else {
      res.status(403).json({ message: "role is not allowed" });
    }
  } catch (e) {
    return res.json({ message: "something went wrong", status: 404 });
  }
}

async function checkRoleUser(
  req: ProtectedRequest,
  res: Response,
  next: NextFunction
): Promise<any> {
  try {
    if (req.user.Role.code == 2) {
      return next();
    } else {
      res.status(403).json({ message: "role is not allowed" });
    }
  } catch (e) {
    return res.json({ message: "something went wrong", status: 404 });
  }
}
export default {
  checkLogin,
  checkRoleAdmin,
  checkRoleBrands,
  checkRoleUser,
};
