const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient();

async function fetchAllDiscordUsers() {
    return allUsers = await prisma.user.findMany();
}

async function fetchSingleDiscordUsersById(user_id) {
    return singleUser = await prisma.user.findUnique({
        where: {
            user_id: user_id
        }
    })
}

module.exports = { fetchAllDiscordUsers, fetchSingleDiscordUsersById };
