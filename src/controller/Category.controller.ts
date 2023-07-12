import { ProtectedRequest } from "app-requst";
import { Request, Response } from "express";
import CategoryRepo from "../repository/CategoryRepo";
async function create(req: ProtectedRequest, res: Response) {
  try {
    let user = req.user;
    if (!req.body.name) {
      return res.status(400).json({
        message: "Name is required",
      });
    }
    if (!req.body.status) {
      return res.status(400).json({
        message: "status is required",
      });
    }
    if (!req.body.isPushlished) {
      return res.status(400).json({
        message: "isPushlished is required",
      });
    }
    let nameCategory = await CategoryRepo.findName(req.body.name);
    if (nameCategory.status === 200) {
      return res.json({
        message: "name is already, please try again",
        status: 404,
      });
    }
    let category = await CategoryRepo.create(Number(user.id), req.body);
    console.log(31, category)

    if (category.status !== 200) {
      return res.json({ message: category.message, status: category.status });
    }
    return res.json({
      message: category.message,
      status: category.status,
      data: category.data,
    });
  } catch (e) {
    return res.json({ message: e, status: 404 });
  }
}

async function findName(req: Request, res: Response) {
  try {
    if (!req.body.name) {
      return res.json({ message: "name not found", status: 404 });
    }
    let category = await CategoryRepo.findName(req.body.name);
    if (category.status !== 200) {
      return res.json({ message: category.message, status: category.status });
    }
    return res.json({
      message: category.message,
      status: category.status,
      data: category.data,
    });
  } catch (e) {
    res.json({ message: e, status: 404 });
  }
}

async function findAll(req: Request, res: Response) {
  try {
    let category = await CategoryRepo.findAll();
    if (category.status !== 200) {
      return res.json({ message: category.message, status: category.status });
    }
    return res.json({
      message: category.message,
      status: category.status,
      data: category.data,
    });
  } catch (e) {
    res.json({ message: e, status: 404 });
  }
}

async function handleName(req: ProtectedRequest, res: Response) {
  try {
    let user = req.user;
    if (!req.params.id) {
      return res.json({ message: "id category not found", status: 404 });
    }
    if (!req.body.name) {
      return res.json({ message: "Please enter a name", status: 404 });
    }
    let categoryUpdate = await CategoryRepo.handleName(
      user.id,
      req.body.name,
      Number(req.params.id)
    );
    if (categoryUpdate.status !== 200) {
      return res.json({
        message: categoryUpdate.message,
        status: categoryUpdate.status,
      });
    }
    return res.json({
      message: categoryUpdate.message,
      status: categoryUpdate.status,
      data: categoryUpdate.data,
    });
  } catch (e) {
    return res.json({ message: e, status: 404 });
  }
}

async function handleStatus(req: ProtectedRequest, res: Response) {
  try {
    let user = req.user;
    if (!req.params.id) {
      return res.json({ message: "id category not found", status: 404 });
    }
    let category = await CategoryRepo.handleStatus(
      user.id,
      Number(req.params.id)
    );
    if (category.status !== 200) {
      return res.json({ message: category.message, status: category.status });
      }
      return res.json({
              message: category.message,
              status: category.status,
              data: category.data,
            });
  } catch (e) {
    return res.json({ message: e, status: 404 });
  }
}

async function handleIsPushlished(req: ProtectedRequest, res: Response) {
  try {
    let user = req.user;
    if (!req.params.id) {
      return res.json({ message: "id category not found", status: 404 });
    }
    let category = await CategoryRepo.handleIsPushlished(
      user.id,
      Number(req.params.id)
    );
    if (category.status !== 200) {
      return res.json({ message: category.message, status: category.status });
      }
      console.log(145, category.data)
    return res.json({ message: category.message, status: category.status, data: category.data });
  } catch (e) {
    return res.json({ message: e, status: 404 });
  }
}

export default {
  handleIsPushlished,
  handleName,
  handleStatus,
  create,
  findName,
  findAll,
};
