const { Events } = require('discord.js');
const translate = require('google-translate-api-x');
const flagsJsonData = require('../json/flags.json');

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
        const emoji = reaction.emoji.name;
        if (emoji in flagsJsonData) {
            const targetLanguage = flagsJsonData[emoji];
            try {
                await reaction.fetch();
                const translatedText = await translation(reaction.message.content, targetLanguage)
                await reaction.message.reply(`Translated Text: ${translatedText.text}`);
            } catch (e) {
                reaction.message.reply("Something went wrong while translating");
            }
        }
    }
};

