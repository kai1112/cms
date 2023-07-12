import prisma from "../lib/prisma";

async function create(idUser: number, idCategory: number, title: string) {
    try {
        let user_game = await prisma.user_update_category.create({
            data: {
                title: title,
                user_id: idUser,
                category_id: idCategory,
            }
        })
        if (!user_game) {
            return {message: 'update idCategory failed', status: 404}
        }
        return {message: 'create success', status: 200}
    } catch (e) { 
        return {message: e, status: 404}
    }
}

export default {create}