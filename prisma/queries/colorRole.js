const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();


/** DOCS:
 * Retrieves the color role assigned to a user in a specific guild.
 * @param {string} userId - The ID of the user.
 * @param {string} guildId - The ID of the guild.
 * @returns {Promise<object>} - A promise resolving to the color role object associated with the user.
 */
async function getColorRoleUser(userId, guildId){
    return user = await prisma.colorRole.findUnique({
        where: {
            userId: userId,
            guildId: guildId
        }
    })
}


/** DOCS:
 * Updates the color role assigned to a user in a specific guild.
 * @param {string} guildId - The ID of the guild.
 * @param {string} userId - The ID of the user.
 * @param {string} roleId - The ID of the role to be assigned.
 * @returns {Promise<object>} - A promise resolving to the updated color role object.
 */
async function updateColorRoleUser(guildId, userId, roleId){
    return user = await prisma.colorRole.update({
        where: {
            guildId: guildId,
            userId: userId,
        },
        data: {
            roleId: roleId,
        }
    })
}


/** DOCS:
 * Creates a new color role entry for a user in a specific guild.
 * @param {string} guildId - The ID of the guild.
 * @param {string} roleId - The ID of the role to be assigned.
 * @param {string} userId - The ID of the user.
 * @returns {Promise<object>} - A promise resolving to the newly created color role object.
 */
async function createColorRoleUser(guildId, roleId, userId){
    return colorRoleObj = await prisma.colorRole.create({
        data: {
            guildId: guildId,
            roleId: roleId,
            userId: userId
        }
    })
}


module.exports = {
    updateColorRoleUser,
    createColorRoleUser,
    getColorRoleUser,
};
