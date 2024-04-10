const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();


/** DOCS:
 * Retrieves the color guild settings for a specific guild.
 * @param {string} guildId - The ID of the guild.
 * @returns {Promise<object>} - A promise resolving to the color guild object associated with the guild.
 */
async function getColorGuild(guildId){
    return colorGuildObj = await prisma.colorGuild.findUnique({
        where: {
            guildId: guildId
        }
    })
}


/** DOCS:
 * Updates the color guild settings for a specific guild.
 * @param {string} guildId - The ID of the guild.
 * @param {string} [channelId] - The ID of the channel where color messages will be sent.
 * @param {string} [colorPosId] - The ID of the position to place the color role in the role hierarchy.
 * @returns {Promise<object>} - A promise resolving to the updated color guild object.
 */
async function updateColorGuild(guildId, channelId, colorPosId){
    if (!channelId || !colorPosId) {
        const res = await getColorGuild(guildId);
        channelId = channelId || res.channelId;
        colorPosId = colorPosId || res.colorPosId;
    }
    return colorGuildObj = await prisma.colorGuild.update({
        where: {
            guildId: guildId
        },
        data: {
            channelId: channelId,
            colorPosId: colorPosId,
        }
    })
}


/** DOCS:
 * Creates color guild settings for a specific guild.
 * @param {string} guildId - The ID of the guild.
 * @param {string} channelId - The ID of the channel where color messages will be sent.
 * @param {string} colorPosId - The ID of the position to place the color role in the role hierarchy.
 * @returns {Promise<object>} - A promise resolving to the newly created color guild object.
 */
async function createColorGuild(guildId, channelId, colorPosId){
    return colorGuildObj = await prisma.colorGuild.create({
        data: {
            channelId: channelId,
            guildId: guildId,
            colorPosId: colorPosId
        }
    })
}



module.exports = {
    getColorGuild,
    updateColorGuild,
    createColorGuild,
}
