import prisma from "../lib/prisma";

async function create(idUser: number, idVoucher: number, title: string) {
  try {
    let userVoucher = await prisma.user_voucher.create({
      data: {
        user_id: idUser,
        voucher_id: idVoucher,
        title: title,
      },
    });
    if (!userVoucher) {
      return { message: "create user voucher failed", stauts: 404 };
    }
    return { message: "create user voucher succeeded", stauts: 200 };
  } catch (e) {
    return { message: e, status: 404 };
  }
}

export default { create };
