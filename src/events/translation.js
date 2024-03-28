const { Events } = require('discord.js');
const translate = require('google-translate-api-x');
const flagsJsonData = require('../json/flags.json');
const { checkWebhook, sendWebhookMessage, createWebhook } = require('../utilities/webhookHandling.js');

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
            let webhook = await checkWebhook(reaction.channel, reaction.message.client);
            if (webhook == false) {
                webhook = await createWebhook(reaction.channel);
            }
            const targetLanguage = flagsJsonData[emoji];
            try {
                await reaction.fetch();
                const translatedText = await translation(reaction.message.content, targetLanguage);
                await reaction.message.reply(`Translated Text: ${translatedText.text}`);
                // TODO: finish webhook implementation
                await sendWebhookMessage(webhook);
            } catch (e) {
                reaction.message.reply("Something went wrong while translating");
            }
        }
        return
    }
};

