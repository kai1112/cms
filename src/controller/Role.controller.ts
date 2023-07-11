import { Response, Request } from "express";
import role from "../repository/RoleRepo";


async function create(req: Request, res: Response) {
  try {
    if (!req.body.code) {
      return res.json({ message: "code not found" });
    }
    if (req.body.code > 2 || req.body.code < 0) { 
      return res.json({ message: "invalid code", status: 404 });
    }
    let data = await role.create(req.body);
    return res.json(data);
  } catch (e) {
    return res.json({ message: e, status: 404 });
  }
}

async function findById(req: Request, res: Response) {
  try {
    if (!req.params.id) {
      return res.json({ message: "id not found" });
    }
    let data = await role.findById(Number(req.params.id));
    return res.json(data);
  } catch (e) {
    return res.json({ message: e, status: 404 });
  }
}

async function findAllRole(req: Request, res: Response) {
  try {
    let data = await role.findAllRole();
    return res.json(data);
  } catch (e) {
    return res.json({ message: e, status: 404 });
  }
}

async function update(req: Request, res: Response) {
  try {
    if (!req.params.id) {
      return res.json({ message: "id not found" });
    }
    let data = await role.update(Number(req.params.id), req.body.code);
    return res.json(data);
  } catch (e) {
    return res.json({ message: e, status: 404 });
  }
}

async function remove(req: Request, res: Response) {
  try {
    if (!req.params.id) {
      return res.json({ message: "id not found" });
    }
    let data = await role.remove(Number(req.params.id));
    return res.json(data);
  } catch (e) {
    return res.json(e);
  }
}

export default {
  create,
  update,
  remove,
  findAllRole,
  findById,
};
