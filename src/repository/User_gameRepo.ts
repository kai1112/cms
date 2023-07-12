import prisma from "../lib/prisma";

async function create(idUser: number, idGame: number, title: string) {
    try {
        let user_game = await prisma.user_update_game.create({
            data: {
                title: title,
                user_id: idUser,
                game_id: idGame,
            }
        })
        if (!user_game) {
            return {message: 'update game failed', status: 404}
        }
        return {message: 'create success', status: 200}
    } catch (e) { 
        return {message: e, status: 404}
    }
}

export default {create}