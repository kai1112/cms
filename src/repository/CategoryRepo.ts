import Category from "../interface/Category";
import prisma from "../lib/prisma";
import User_categoryRepo from "./User_categoryRepo";
async function create(idUser: Number, data: Category): Promise<any> {
  try {
    console.log(14, idUser, data)

    let category = await prisma.category.create({
      data: {
        name: data.name,
        status: Boolean(data.status),
        isPushlished: Boolean(data.isPushlished),
        userCreate_id: Number(idUser),
      },
    });
    if (!category) {
      return { message: "category not created", status: 404 };
    }
    return { message: "success", status: 200, data: category };
  } catch (e) {
    return { message: e, status: 404 };
  }
}

async function findName(name: string): Promise<any> {
  try {
    let category = await prisma.category.findFirst({
      where: {
        name: name,
      },
    });
    if (!category) {
      return { message: "category not found", status: 404 };
    }
    return { message: "success", status: 200, data: category };
  } catch (e) {
    return { message: e, status: 404 };
  }
}

async function findAll(): Promise<any> {
  try {
    let category = await prisma.category.findMany();
    if (!category) {
      return { message: "category not found", status: 404 };
    }
    return { message: "success", status: 200, data: category };
  } catch (e) {
    return { message: e, status: 404 };
  }
}

async function getCategoryById(id: number) {
  try {
    let category = await prisma.category.findUnique({
      where: {
        id: id,
      },
    });
    if (!category) {
      return { message: "category not found", status: 404 };
    }
    return { message: "success", status: 200, data: category };
  } catch (e) {
    return { message: e, status: 404 };
  }
}

async function handleName(idUser: number, name: string, idCategory: number) {
  try {
    let category = await prisma.category.update({
      where: {
        id: idCategory,
      },
      data: {
        name: name,
        // userUpdate_id: Number(idUser),
      },
    });
    if (!category) {
      return { message: "category not updated", status: 404 };
    }
    let update = await User_categoryRepo.create(
      idUser,
      category.id,
      "update name"
    );
    if (update.status !== 200) {
      return { message: "logged user update name category failed", status: 404 };
    }
    return { message: "category updated", status: 200, data: category };
  } catch (e) {
    return { message: e, status: 404 };
  }
}

async function handleStatus(idUser: number, idCategory: number) {
  try {
    let findCategory = await getCategoryById(idCategory);
    if (findCategory.status !== 200) {
      return { message: findCategory.message, status: findCategory.status };
    }
    let category = await prisma.category.update({
      where: {
        id: idCategory,
      },
      data: {
        status: !findCategory.data?.status,
        // userUpdate_id: Number(idUser),
      },
    });
    let update = await User_categoryRepo.create(
      idUser,
      category.id,
      "update status"
    );
    if (update.status !== 200) {
      return { message: "logged user update status category failed", status: 404 };
    }
    if (!category) {
      return { message: "category not updated", status: 404 };
    }
    return { message: "category updated", status: 200, data: category };
  } catch (e) {
    return { message: e, status: 404 };
  }
}


async function handleIsPushlished(idUser: number, idCategory: number) {
  try {
    let findCategory = await getCategoryById(idCategory)
    if (findCategory.status !== 200) {
      return { message: findCategory.message, status: findCategory.status };
    }
    let category = await prisma.category.update({
      where: {
        id: idCategory
      },
      data: {
        isPushlished: !findCategory.data?.isPushlished,
        // userUpdate_id: Number(idUser),
      }
    })
    if (!category) {
      return {message: 'category update failed', status: 200}
    }
    let update = await User_categoryRepo.create(
      idUser,
      category.id,
      "update ispushished"
    );
    if (update.status !== 200) {
      return { message: "logged user update ispushished category failed", status: 404 };
    }
    return {message: 'category updated', status: 200, data: category}
  } catch (e) {
    return { message: e, status: 404 };
  }
}
export default { create, findAll, findName, handleName, handleIsPushlished ,handleStatus};
