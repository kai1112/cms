import Role from "../interface/Role";
import prisma from "../lib/prisma";

async function create(role: Role): Promise<any> {
  try {
    let dataRole = await prisma.role.findFirst({
      where: {
        code: Number(role.code),
      },
    });
    if (dataRole) {
      return { message: "role is already", status: 404 };
    }
    console.log(role);
    let data = await prisma.role.create({
      data: {
        code: Number(role.code),
      },
    });
    if (data) {
      return { message: "create role success", status: 200, data: data };
    }
    return { message: "create fail", status: 404 };
  } catch (e) {
    return { message: 'code only could be number', status: 404 };
  }
}

async function findById(id: number): Promise<any> {
  try {
    let data = await prisma.role.findFirst({
      where: {
        id: id,
      },
    });
    if (data) {
      return { message: "success", stauts: 200, data: data };
    }
    return { message: "cannot find id", status: 404 };
  } catch (e) {
    return { message: "id only could be number", status: 404 };
  }
}

async function findAllRole(): Promise<any> {
  try {
    let data = await prisma.role.findMany({});
    if (data) {
      return { message: "success", stauts: 200, data: data };
    }
    return { message: "cannot find id", status: 404 };
  } catch (e) {
    return { message: e, status: 404 };
  }
}

async function update(id: number, code: number): Promise<any> {
  try {
    let dataRole = await prisma.role.findFirst({
      where: {
        id: id,
      },
    });
    if (!dataRole) {
      return { message: "id not found" };
    }
    let data = await prisma.role.update({
      where: {
        id: id,
      },
      data: {
        code: Number(code),
      },
    });
    if (data) {
      return { message: "update success", status: 200, data: data };
    }
    return { message: "update fail", stauts: 404 };
  } catch (e) {
    return { message: "code only could be number", status: 404 };
  }
}

async function remove(id: number): Promise<any> {
  try {
    let data = await prisma.role.delete({
      where: {
        id: id,
      },
    });
    if (data) {
      return { message: "delete successfull", status: 200 };
    }
    return { message: "delete fail", status: 404 };
  } catch (e) {
    return { message: "Record to delete does not exist", status: 404 };
  }
}

export default {
  create,
  findById,
  findAllRole,
  update,
  remove,
};
