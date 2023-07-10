import User from "../interface/User";
import prisma from "../lib/prisma";
import bcrypt from "bcrypt";

async function create(User: User): Promise<any> {
  try {
    let data = await prisma.user.create({
      data: {
        userName: User.userName,
        password: User.password,
        nickName: User.nickName,
        avatar: User.avatar,
        phoneNumber: User.phoneNumber,
        email: User.email,
        role_id: Number(User.role_id),
      },
    });
    if (!data) {
      return { message: "fail to create user", status: 404 };
    }

    return {
      message: "success",
      status: 200,
      data: data,
    };
  } catch (e) {
    return { message: e, status: 404 };
  }
}

async function findByUserName(userName: string): Promise<User | any> {
  try {
    let data = await prisma.user.findFirst({
      where: {
        userName: userName,
      },
    });

    if (!data) {
      return { message: "fail to find user", status: 404 };
    }
    return { messaage: "success", status: 200, data: data };
  } catch (e) {
    return { message: e, status: 404 };
  }
}

async function findById(id: number): Promise<any> {
  try {
    let data = await prisma.user.findFirst({
      where: {
        id: id,
      },
      select: {
        id: true,
        userName: true,
        phoneNumber: true,
        email: true,
        Role: {
          select: {
            code: true,
          },
        },
      },
    });
    if (!data) {
      return { message: "fail to find user", status: 404 };
    }
    return { messaage: "success", status: 200, data: data };
  } catch (e) {
    return { message: e, status: 404 };
  }
}

async function updateToken(
  id: number,
  accessToken: string,
  refreshToken: string
): Promise<any> {
  try {
    let user = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        accesstoken: accessToken,
        refreshtoken: refreshToken,
      },
    });
    if (!user) {
      return { message: "update fail", status: 404 };
    }
  } catch (e) {
    return { message: e, status: 404 };
  }
}

async function deleteById(id: number): Promise<any> {
  try {
    let user = await prisma.user.delete({
      where: {
        id: id,
      },
    });
    if (!user) {
      return { message: "delete fail", status: 404 };
    }
    return { messaage: "success", status: 200, data: user };
  } catch (e) {
    return { message: e, status: 404 };
  }
}

async function findAll(): Promise<any> {
  try {
    let data = await prisma.user.findMany({
      select: {
        id: true,
        nickName: true,
        avatar: true,
        phoneNumber: true,
        email: true,
        Role: {
          select: {
            code: true,
          },
        },
      },
    });
    if (!data) {
      return { message: "fail to find user", status: 404 };
    }
    return { messaage: "success", status: 200, data: data };
  } catch (e) {
    return { message: e, status: 404 };
  }
}

async function handlePassword(id: number, newPassword: string): Promise<any> { 
  try {
    let passwordHash = await bcrypt.hash(newPassword, 10);
    let user = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        password: passwordHash
      }
    })
    if (!user) {
      return { message: "update fail", status: 404 };
    }
    return { messaage: "success", status: 200, data: user };
  } catch (e) {
    return { message: e, status: 404 };
  }
}

async function handleNickName(id: number, nickName: string): Promise<any> { 
  try {
    console.log(162, id, nickName);
      let user = await prisma.user.update({
        where: {
          id: id,
        },
        data: {
          nickName: nickName
        }
      })
      if (!user) {
        return { message: "update fail", status: 404 };
      }
      return { messaage: "success", status: 200, data: user };
    } catch (e) {
      return { message: e, status: 404 };
    }
}

async function handleAvatar(id: number, avatar: string): Promise<any> { 
  try {
        let user = await prisma.user.update({
          where: {
            id: id,
          },
          data: {
            avatar: avatar
          }
        })
        if (!user) {
          return { message: "update fail", status: 404 };
        }
        return { messaage: "success", status: 200, data: user };
      } catch (e) {
        return { message: e, status: 404 };
      }
}


async function handlePhoneNumber(id: number, phoneNumber: string): Promise<any> { 
  try {
          let user = await prisma.user.update({
            where: {
              id: id,
            },
            data: {
              phoneNumber: phoneNumber
            }
          })
          if (!user) {
            return { message: "update fail", status: 404 };
          }
          return { messaage: "success", status: 200, data: user };
        } catch (e) {
          return { message: e, status: 404 };
        }
}

async function handleEmail(id: number, email: string): Promise<any> { 
  try {
          let user = await prisma.user.update({
            where: {
              id: id,
            },
            data: {
              email: email
            }
          })
          if (!user) {
            return { message: "update fail", status: 404 };
          }
          return { messaage: "success", status: 200, data: user };
        } catch (e) {
          return { message: e, status: 404 };
        }
}
export default {
  create,
  findByUserName,
  findById,
  updateToken,
  findAll,
  deleteById,
  handlePassword,
  handleAvatar,
  handleEmail,
  handlePhoneNumber,
  handleNickName
};
