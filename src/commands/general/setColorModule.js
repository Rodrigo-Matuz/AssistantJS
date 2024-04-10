const { SlashCommandBuilder, Colors } = require("discord.js");
const { createColorGuild } = require("../../../prisma/queries/colorGuild");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("set_color_module")
        .setDescription("SetColorModule for a server")        
        .addChannelOption(option =>
            option
                .setName("channel")
                .setDescription("Channel for color module")
                .setRequired(true)
        )
        .addRoleOption(option =>
            option
                .setName("role")
                .setDescription("Color role to keep track (will create one by default)")
        )
    ,
    async execute(interaction) {
        if (!interaction.isCommand()) return;
        if (interaction.user.id != "584503954969198612") {
            await interaction.reply({
                content: "This command can only be used by <@584503954969198612> for now...",
                ephemeral: true
            })
        } else {
            const channel = interaction.options.getChannel("channel");
            let colorRole = interaction.options.getRole("role");
            if (!colorRole) {
                colorRole = await interaction.guild.roles.create({
                    name: "Color Role",
                    color: Colors.Default,
                    reason: "Color Role, all colors will be added below this Role"
                })
            }
            try {
                // TODO: Set good embed
                await createColorGuild(interaction.guild.id, channel.id, colorRole.id);
                await interaction.reply({
                    content: `> **Colors** module successfully added in this Server\n> ${channel.url} and ${colorRole}`,
                    ephemeral: true
                })
            } catch (err) {
                console.log(err);
            }
        }
    } 
};
