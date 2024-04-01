const { Events } = require('discord.js');
const translate = require('google-translate-api-x');
const flagsJsonData = require('../json/flags.json');
const { TranslationEmbed } = require('../utilities/embeds.js');

async function translation(textToTranslate, targetLanguage) {
    try {
        return res = await translate(`${textToTranslate}`, { to: `${targetLanguage}` });
    } catch (e) {
        console.log(`Error: ${e}`);
    }
};

// TODO: implement embed translations
module.exports = {
    name: Events.MessageReactionAdd,
    async execute(reaction, user) {
        if (user.id == reaction.message.client.user.id) {
            return
        }
        const emoji = reaction.emoji.name;
        if (emoji in flagsJsonData) {
            const targetLanguage = flagsJsonData[emoji];
            try {
                await reaction.fetch();
                const translatedText = await translation(reaction.message.content, targetLanguage);
                const translatedEmbed = await TranslationEmbed(user, translatedText.text);
                reaction.message.reply({ embeds: [translatedEmbed] });
            } catch (e) {
                reaction.message.reply("Something went wrong while translating");
                console.log(`Error in [Translation] ${e}`);
            }
        }
        if (emoji == '❌') {
            await reaction.fetch();
            try {
                const userUrl = reaction.message.embeds[0].data.author.url
                const userIdFromUrl = userUrl.split('/').pop();
                if (userIdFromUrl == user.id) {
                    await reaction.message.delete();
                }
            } catch (e) {
                console.log(`Error in [Translation X]: ${e}`)
            } 
        }
        return;
    }
};

