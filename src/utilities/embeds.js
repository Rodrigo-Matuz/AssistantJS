const { EmbedBuilder } = require('discord.js');


/**
 * Constructs an embed containing a translation for a user.
 * @param {Object} user - The Discord user for whom the translation is intended.
 * @param {string} translation - The translated text to be displayed in the embed.
 * @returns {Object} - An embed object containing the translated text and related user information.
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

/**
 * Constructs an embed containing the avatar or banner of a Discord member or user.
 * @param {Object} member - The Discord member whose avatar or banner to display.
 * @param {Object} user - The Discord user associated with the member.
 * @param {boolean} [banner_mode] - Optional. If true, fetches the member's banner instead of avatar.
 * @param {boolean} [true_avatar] - Optional. If true, fetches the user's avatar instead of member's.
 * @returns {Object} - An embed object containing the avatar or banner image and related information.
 */
function avatarEmbed(member, user, banner_mode, true_avatar) {
    let avatar_url = member.displayAvatarURL({
        size: 2048,
        extension: "png",
    })
    if (true_avatar == true) {
        avatar_url = user.avatarURL({
            size: 2048,
            extension: "png",
        })
    }
    if (banner_mode == true) {
        avatar_url = member.bannerURL({
            size: 4096,
            extension: "png"
        })
    }
    const avatar_string = banner_mode
        ? "'s Banner"
        : "'s Avatar"
    const embed = new EmbedBuilder()
        .setColor(user.accentColor)
        .setTitle(`${member.displayName}` + avatar_string)
        .setImage(avatar_url)
        .setAuthor({
            name: `${user.username}`,
            iconURL: `${user.avatarURL()}`,
            url: `https://discord.com/users/${user.id}`,
        })
        .setDescription(`[||Open in Browser||](${avatar_url})`);
    return embed;
}

module.exports = { TranslationEmbed, avatarEmbed };
