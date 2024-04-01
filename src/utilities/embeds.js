const { EmbedBuilder } = require('discord.js');

/**
 * Takes a user and translated text, then return embed
 * @param user [discord user]
 * @param translation [string]
 * @return embed [discord embed]
 */
async function TranslationEmbed(user, translation) {
    await user.fetch();
    const embed = new EmbedBuilder()
        .setColor(user.accentColor)
        .setTitle(` `)
        .setDescription(translation)
        .setAuthor({
            name: user.displayName,
            iconURL: user.displayAvatarURL(),
            url: `https://discord.com/users/${user.id}`
        });
    return embed;
}

module.exports = { TranslationEmbed };
