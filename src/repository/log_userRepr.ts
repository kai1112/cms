import Role from "../interface/Role";
import prisma from "../lib/prisma";

async function allUser() {
  try {
    let allUser = await prisma.user.findMany();
    if (!allUser.length) {
      return { message: "User not found", status: 404 };
    }
    return { message: "success", status: 200, data: allUser };
  } catch (e) {
    return { message: e, status: 404 };
  }
}

async function getUserRegisterByMonth(dateStart: Date, dateEnd: Date) {
  try {
    let registerByMonth = await prisma.user.findMany({
      where: {
        createdAt: {
            gte: new Date(dateStart),
            lte: new Date(dateEnd),
        },
      },
    });
    if (!registerByMonth.length) {
      return { message: "User not found", status: 404 };
    }
    return { message: "success", status: 200, data: registerByMonth };
  } catch (e) {
    return { message: e, status: 404 };
  }
}

async function getUserLoginByMonth(dateStart: Date, dateEnd: Date) {
  try {
    let loginByMonth = await prisma.loginLog.findMany({
      where: {
        createdAt: {
          gte: new Date(dateStart),
          lte: new Date(dateEnd),
        },
      },
    });
    if (!loginByMonth.length) {
        return { message: "User not found", status: 404 };
      }
      return { message: "success", status: 200, data: loginByMonth };
  } catch (e) {
    return { message: e, status: 404 };
  }
}

export default {
  allUser,
  getUserRegisterByMonth,
  getUserLoginByMonth,
};
