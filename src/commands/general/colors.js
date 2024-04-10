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
async function getOrCreateRole(interaction, hexCode, position) {
    let role = interaction.guild.roles.cache.find(role => role.name === hexCode);
    if (!role) {
        role = await interaction.guild.roles.create({
            name: `${hexCode}`,
            reason: "Color role",
            hoist: false,
            mentionable: false,
            position: (position - 1),
            color: `${hexCode}`,
            permissions: [],
        })
    }
    return role;
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

        const hexCode = interaction.options.getString("hex")
        if (!isValidHex(hexCode)) {            
            await interaction.reply({ 
                content: "Not a valid #HEX color",
                ephemeral: true
            })
            return;
        }
        // TODO: add this command only for available guilds so no need to check
        const colorRoleObj = await getColorGuild(interaction.guild.id);
        if (!colorRoleObj) {
            await interaction.reply({
                content: "This guild does not have the Color Module set",
                ephemeral: true
            });
            return;
        }
        const colorRole = interaction.guild.roles.cache.find(role => role.id === colorRoleObj.colorPosId);
        if (!colorRole) {
            await interaction.reply({
                content: `There is not Color Role for reference, previous color role: <@&${colorRoleObj.colorPosId}>\nIf it's deleted, please set another one.`,
                ephemeral: true,
            })
            return;
        }
        const role = await getOrCreateRole(interaction, hexCode, colorRole.position);
        const colorRoleUser = await getColorRoleUser(interaction.user.id, interaction.guild.id);
        if (!colorRoleUser) {
            
        }
         
        //const user = await fetchSingleDiscordUsersById(interaction.user.id);
        //if (!user) {
            
        //}
        //await updateUserWithColorRole(user) 
//      let user  = await fetchSingleDiscordUsersById(interaction.user.id);
//        if (user == false){
//            const userId = interaction.user.id;
//            const userName = interaction.user.username;
//        } else {
//            const client = interaction.client;
//            const user = client.users.fetch(`${interaction.user.id}`)
//            console.log(user);
//        }
    }
};
