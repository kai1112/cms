import Game from "../interface/Game";
import prisma from "../lib/prisma";
import Category_GameRepo from "../repository/Category_GameRepo";
import user_gameRepo from "../repository/User_gameRepo";

async function create(idUser: number, data: Game, category: []): Promise<any> {
  try {
    let game = await prisma.game.create({
      data: {
        name: data.name,
        url: data.url,
        developer: data.developer,
        description: data.description,
        userCreate_id: idUser,
      },
    });
    if (!game) {
      return { message: "Game not created", status: 400 };
    }
    let category_Game = await Category_GameRepo.create(
      Number(game.id),
      category
    );
    console.log(20, category_Game);
    if (category_Game?.status === 404) {
      return { message: "create category game faild" };
    }
    return { message: "success", status: 200, data: game };
  } catch (e) {
    return { message: e, status: 404 };
  }
}

async function findName(name: string): Promise<any> {
  try {
    let game = await prisma.game.findUnique({
      where: {
        name: name,
      },
    });
    if (!game) {
      return { message: "Game not found", status: 404 };
    }
    return { message: "success", status: 200, data: game };
  } catch (e) {
    return { message: e, status: 404 };
  }
}

async function findAll(): Promise<any> {
  try {
    let games = await prisma.game.findMany();
    if (!games) {
      return { message: "Games not found", status: 404 };
    }
    return { message: "success", status: 200, data: games };
  } catch (e) {
    return { message: e, status: 404 };
  }
}

async function findById(id: number): Promise<any> {
  try {
    let game = await prisma.game.findUnique({
      where: {
        id: id,
      },
    });
    if (!game) {
      return { message: "Game not found", status: 404 };
    }
    return { message: "success", status: 200, data: game };
  } catch (e) {
    return { message: e, status: 404 };
  }
}

async function remove(idUser: number, id: number): Promise<any> {
  try {
    let game = await prisma.game.update({
      where: {
        id: id,
      },
      data: {
        status: 1,
        userDelete_id: idUser,
      },
    });
    if (!game) {
      return { message: "Game not removed", status: 404 };
    }
    return { message: "Game removed", status: 200, data: game };
  } catch (e) {
    return { message: e, status: 404 };
  }
}

async function handleDescription(
  idUser: number,
  id: number,
  description: string
): Promise<any> {
  try {
    let game = await prisma.game.update({
      where: {
        id: id,
      },
      data: {
        // userUpdate_id: idUser,
        description: description,
      },
    });
    if (!game) {
      return { message: "Game not updated", status: 404 };
    }
    let update = await user_gameRepo.create(
      idUser,
      game.id,
      "update description"
    );
    if (update.status !== 200) {
      return { message: "logged user update game failed", status: 404 };
    }
    return { message: "update success", status: 200, data: game };
  } catch (e) {
    return { message: e, status: 404 };
  }
}

async function handleDeveloper(
  idUser: number,
  id: number,
  developer: string
): Promise<any> {
  try {
    let game = await prisma.game.update({
      where: {
        id: id,
      },
      data: {
        // userUpdate_id: idUser,
        developer: developer,
      },
    });
    if (!game) {
      return { message: "Game not updated", status: 404 };
    }
    let update = await user_gameRepo.create(
      idUser,
      game.id,
      "update developer"
    );
    if (update.status !== 200) {
      return { message: "logged user update game failed", status: 404 };
    }
    return { message: "update success", status: 200, data: game };
  } catch (e) {
    return { message: e, status: 404 };
  }
}

export default {
  create,
  findName,
  findAll,
  findById,
  remove,
  handleDescription,
  handleDeveloper,
};
