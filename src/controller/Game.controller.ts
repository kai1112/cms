import { ProtectedRequest } from "app-requst";
import { Request, Response } from "express";
import gameRepo from "../repository/GameRepo";

async function create(req: ProtectedRequest, res: Response) {
  try {
    let user = req.user;
    if (!req.body.name)
      return res.json({ message: "name is required", status: 404 });
    if (!req.body.url)
      return res.json({ message: "url is required", status: 404 });
    if (!req.body.developer)
      return res.json({ message: "developer is required", status: 404 });
    if (!req.body.description)
      return res.json({ message: "description is required", status: 404 });
      if (!req.body.category)
      return res.json({ message: "description is required", status: 404 });
    let findGame = await gameRepo.findName(req.body.name);
    if (findGame.status === 200)
      return res.json({ message: 'name is already', status: findGame.status });
    let game = await gameRepo.create(user.id, req.body, req.body.category);
    if (game.status !== 200)
      return res.json({ message: game.message, status: game.status });
    return res.json({
      message: game.message,
      status: game.status,
      data: game.data,
    });
  } catch (e) {
    return res.json({ message: e, status: 404 });
  }
}

async function findGameByName(request: Request, res: Response) {
  try {
    if (!request.body.name)
      return res.json({ message: "name not found", status: 404 });
    let game = await gameRepo.findName(request.body.name);
    if (game.status !== 200) {
      return res.json({ message: game.message, status: game.status });
    }
    return res.json({
      message: game.message,
      status: game.status,
      data: game.data,
    });
  } catch (e) {
    return res.json({ message: e, status: 404 });
  }
}

async function findAll(req: Request, res: Response) {
  try {
    let game = await gameRepo.findAll();
    if (game.status !== 200) {
      return res.json({ message: game.message, status: game.status });
    }
    return res.json({
      message: game.message,
      status: game.status,
      data: game.data,
    });
  } catch (e) {
    return res.json({ message: e, status: 404 });
  }
}

async function remove(req: ProtectedRequest, res: Response) {
  try {
    let user = req.user;
    if (!req.params.id) {
      return res.json({ message: "id not found", status: 404 });
    }
    let game = await gameRepo.remove(user.id, Number(req.params.id));
    if (game.status !== 200) {
      return res.json({ message: game.message, status: game.status });
    }
    return res.json({
      message: game.message,
      status: game.status,
      data: game.data,
    });
  } catch (e) {
    return res.json({ message: e, status: 404 });
  }
}

async function handleDescription(req: ProtectedRequest, res: Response) {
  try {
    let user = req.user;
    if (!req.params.id) {
      return res.json({ message: "id not found", status: 404 });
    }
    let game = await gameRepo.handleDescription(
      user.id,
      Number(req.params.id),
      req.body.description
    );
    if (game.status !== 200) {
      return res.json({ message: game.message, status: game.status });
    }
    return res.json({
      message: game.message,
      status: game.status,
      data: game.data,
    });
  } catch (e) {
    return res.json({ message: e, status: 404 });
  }
}

async function handleDeveloper(req: ProtectedRequest, res: Response) {
    try {
        let user = req.user;
                if (!req.params.id) {
                    return res.json({ message: "id not found", status: 404 });
                }
                let game = await gameRepo.handleDeveloper(
                    user.id,
                    Number(req.params.id),
                    req.body.developer
                );
                if (game.status!== 200) {
                    return res.json({ message: game.message, status: game.status });
                }
                return res.json({
                    message: game.message,
                    status: game.status,
                    data: game.data,
                });
    } catch (e) {
        return res.json({ message: e, status: 404 });
    }
}
export default {
  create,
  findGameByName,
  findAll,
  remove,
  handleDescription,
  handleDeveloper,
};
