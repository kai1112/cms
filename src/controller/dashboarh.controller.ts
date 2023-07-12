import { ProtectedRequest } from "app-requst";
import { Request, Response } from "express";
import log_userRepo from "../repository/log_userRepr";

async function getAllUsers(req: ProtectedRequest, res: Response) {
  try {
    let user = await log_userRepo.allUser();
    if (user.status !== 200) {
      return res.json({ message: user.message, status: user.status });
    }
    return res.json({
      message: user.message,
      status: user.status,
      data: user.data,
    });
  } catch (e) {
    return res.json({ message: e, status: 404 });
  }
}

async function getUserRegisterByMonth(req: ProtectedRequest, res: Response) {
  try {
    if (!req.body.dateStart) {
      return res.json({ message: "Date Start is required", status: 404 });
    }
    if (!req.body.dateEnd) {
      return res.json({ message: "Date End is required", status: 404 });
    }
    let user = await log_userRepo.getUserRegisterByMonth(
      req.body.dateStart,
      req.body.dateEnd
    );
    if (user.status !== 200) {
      return res.json({ message: user.message, status: user.status });
    }
    return res.json({
      message: user.message,
      status: user.status,
      data: user.data,
    });
  } catch (e) {
    return res.json({ message: e, status: 404 });
  }
}

async function getUserLoginByMonth(req: ProtectedRequest, res: Response) {
  try {
    console.log(48, req.body);
    if (!req.body.dateStart) {
      return res.json({ message: "Date Start is required", status: 404 });
    }
    if (!req.body.dateEnd) {
      return res.json({ message: "Date End is required", status: 404 });
    }
    let user = await log_userRepo.getUserLoginByMonth(
      req.body.dateStart,
      req.body.dateEnd
    );
    if (user.status !== 200) {
      return res.json({ message: user.message, status: user.status });
    }
    return res.json({
      message: user.message,
      status: user.status,
      data: user.data,
    });
  } catch (e) {
    return res.json({ message: e, status: 404 });
  }
}

export default {
  getUserLoginByMonth,
  getUserRegisterByMonth,
  getAllUsers,
};
