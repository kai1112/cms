import { KeyStore } from "../interface/KeyStore";
import prisma from "../lib/prisma";

async function create(
  user_id: number,
  primaryKey: string,
  secondaryKey: string
): Promise<any> {
  try {
    let keyStore = await prisma.keyStore.create({
      data: {
        user_id: user_id,
        primaryKey: primaryKey,
        secondaryKey: secondaryKey,
      },
    });
    if (!keyStore) {
      return { message: "create keystore failed", status: 404 };
    }
    return { nessage: "create keystore success", status: 200, data: keyStore };
  } catch (e) {
    return { message: e, status: 404 };
  }
}

async function findForKey(user_id: number, key: string): Promise<any> {
  try {
    let data = await prisma.keyStore.findFirst({
      where: {
        user_id: user_id,
        primaryKey: key,
      },
    });
    if (!data) {
      return { message: "keystore not found", status: 404 };
    }
    return { message: "success", status: 200, data: data };
  } catch (e) {
    return { message: e, status: 404 };
  }
}

async function find(
  user_id: number,
  primaryKey: string,
  secondaryKey: string
): Promise<any> {
  try {
    let data = await prisma.keyStore.findFirst({
      where: {
        user_id: user_id,
        primaryKey: primaryKey,
        secondaryKey: secondaryKey,
      },
    });
    if (!data) {
      return { message: "keystore not found", status: 404 };
    }
    return { message: "success", status: 200, data: data };
  } catch (e) {
    return { message: e, status: 404 };
  }
}

async function remove(id: number): Promise<any> {
  try {
    let data = await prisma.keyStore.delete({
      where: {
        id: id,
      },
    });
    if (!data) {
      return { message: "keystore not found", status: 404 };
    }
    return { message: "success", status: 200, data: data };
  } catch (e) {
    return { message: e, status: 404 };
  }
}

async function removeAllForUser(user_id: number): Promise<any> {
  try {
    let data = await prisma.keyStore.deleteMany({
      where: {
        user_id: user_id,
      },
    });
    if (!data) {
      return { message: "keystore not found", status: 404 };
    }
    return { message: "success", status: 200, data: data };
  } catch (e) {
    return { message: e, status: 404 };
  }
}

export default {
  create,
  findForKey,
  find,
  remove,
  removeAllForUser,
};
