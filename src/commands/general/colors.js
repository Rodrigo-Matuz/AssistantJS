const { SlashCommandBuilder } = require("discord.js");
const { getColorRoleUser, createColorRoleUser, updateColorRoleUser } = require("../../../prisma/queries/colorRole.js");
const { getColorGuild, updateColorGuild, createColorGuild } = require("../../../prisma/queries/colorGuild.js")

// TODO: put this function somewhere else
function isValidHex(hexColor) {
    hexColor = hexColor.replace("#", "");
    if (hexColor.length === 6) {
        if (/^[0-9A-Fa-f]+$/.test(hexColor)) {
            return "#" + hexColor;
        }
    }
    return null;
}

// TODO: put this function somewhere else
async function createRole(interaction, hexCode, position) {
    return role = await interaction.guild.roles.create({
        name: `${hexCode}`,
        reason: "Color role",
        hoist: false,
        mentionable: false,
        position: position,
        color: `${hexCode}`,
        permissions: [],
    });
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName("color")
        .setNameLocalizations({
            "pt-BR": "cor",
            "es-ES": "color",
        })
        .setDescription("Make your own color role")
        .setDescriptionLocalizations({
            "pt-BR": "Faça o seu cargo de cor",
            "es-ES": "Crea tu propio rol de color",
        })
        .addStringOption((option) => 
            option
                .setName("hex")
                .setDescription("Type a #Hex color (# not necessary | must be 6 digits)")
                .setDescriptionLocalizations({
                    "pt-BR": "Digite um código #Hex (# não é necessária | precisa ter 6 dígitos)",
                    "es-ES": "Escribe un color #Hex (el # no es necesario | debe tener 6 dígitos)",
                })
                .setRequired(true)
        )
    ,
    async execute(interaction) {
        if (!interaction.isCommand()) return;
        await interaction.deferReply({ ephemeral: true });
        const hexCode = interaction.options.getString("hex")
        if (!isValidHex(hexCode)) {            
            await interaction.reply({ 
                content: "Not a valid #HEX color",
            })
            return;
        }
        const guild = interaction.guild;
        // TODO: add this command only for available guilds so no need to check
        const colorGuildObj = await getColorGuild(guild.id);
        if (!colorGuildObj) {
            await interaction.reply({ content: "This guild does not have the Color Module set" });
            return;
        }
        const colorRole = guild.roles.cache.find(role => role.id === colorGuildObj.colorPosId);
        if (!colorRole) {
            await interaction.reply({ content: `There is not Color Role for reference, previous color role: <@&${colorGuildObj.colorPosId}>\nIf it's deleted, please set another one.` })
            return;
        }
        // TODO: beautify this and add more error catching.
        const user = interaction.member;
        let role = await guild.roles.cache.find(role => role.name === hexCode);
        let colorRoleUserObj = await getColorRoleUser(user.id, guild.id);
        if (!colorRoleUserObj) {
            if (!role) {
                role = await createRole(interaction, hexCode, colorRole.position);
                await user.roles.add(role);
            } else {
                await user.roles.add(role);
            }
        await createColorRoleUser(guild.id, user.id, role.id);
        } else {
            const currentRole = await guild.roles.cache.find(role => role.id === colorRoleUserObj.roleId);
            if (!role) {
                role = await createRole(interaction, hexCode, colorRole.position);
            };
            // FIX: Currently not working
            await user.roles.remove(currentRole);
            if (currentRole.members.some(member => member.id !== user.id)) {
                await currentRole.delete();
            }
            await user.roles.add(role);
            await updateColorRoleUser(guild.id, user.id, role.id);
        }
        await interaction.editReply({ content: "Done!"});
    }
};
