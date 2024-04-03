const { SlashCommandBuilder } = require("discord.js");
const { avatarEmbed } = require("../../utilities/embeds.js");

// TODO: Separate all text in JSON file.
module.exports = {
    data: new SlashCommandBuilder()
        .setName("avatar")
        .setNameLocalizations({
            "pt-BR": "avatar",
            "es-ES": "avatar",
        })
        .setDescription("Get avatar of a user (with additional options)")
        .setDescriptionLocalizations({
            "pt-BR": "Mostra o avatar de um usuário (com opções adicionais)",
            "es-ES":
                "Muestra el avatar de un usuario (con opciones adicionales)",
        })
        .addUserOption((option) =>
            option
                .setName("user")
                .setNameLocalizations({
                    "pt-BR": "usuário",
                    "es-ES": "usuario",
                })
                .setDescription(
                    "The user you want to see the avatar (you by default)"
                )
                .setDescriptionLocalizations({
                    "pt-BR":
                        "O usuário que você quer ver o avatar (você por padrão)",
                    "es-ES":
                        "El usuario cuyo avatar quieres ver (tú por defecto)",
                })
        )
        .addBooleanOption((option) =>
            option
                .setName("true_avatar")
                .setNameLocalizations({
                    "pt-BR": "avatar_verdadeiro",
                    "es-ES": "avatar_verdadero",
                })
                .setDescription(
                    "want to see the user's true avatar? (display avatar by default)"
                )
                .setDescriptionLocalizations({
                    "pt-BR":
                        "Quer ver o avatar verdadeiro do usuário? (avatar em exibição por padrão)",
                    "es-ES":
                        "¿Quieres ver el avatar verdadero del usuario? (muestra avatar por defecto)",
                })
        )
        .addBooleanOption((option) =>
            option
                .setName("hide")
                .setNameLocalizations({
                    "pt-BR": "esconder",
                    "es-ES": "esconder",
                })
                .setDescription("Hide this command? (True by default)")
                .setDescriptionLocalizations({
                    "pt-BR": "Esconder esse comando? (verdadeiro por padrão)",
                    "es-ES": "¿Ocultar este comando? (verdadero por defecto)",
                })
        )
        .addBooleanOption((option) =>
            option
                .setName("banner_mode")
                .setNameLocalizations({
                    "pt-BR": "modo_banner",
                    "es-ES": "modo_banner",
                })
                .setDescription(
                    "Get the user's banner instead? (false by default)"
                )
                .setDescriptionLocalizations({
                    "pt-BR":
                        "Mostrar o banner do usuário em vez disso? (falso por padrão)",
                    "es-ES":
                        "¿Obtener el banner del usuario en su lugar? (falso por defecto)",
                })
        ),
    async execute(interaction) {
        if (!interaction.isCommand()) return;
        // NOTE: Defining default options
        const opts = interaction.options;
        const userOption = opts.getUser("user") || interaction.user;
        const trueAvatarOption = opts.getBoolean("true_avatar") ?? false;
        const hideOption = opts.getBoolean("hide") ?? true;
        const bannerModeOption = opts.getBoolean("banner_mode") ?? false;
        await userOption.fetch();
        const embed = avatarEmbed(
            interaction.member,
            userOption,
            bannerModeOption,
            trueAvatarOption
        );
        await interaction.reply({ embeds: [embed], ephemeral: hideOption });
    },
};
