/**
 * Takes a channel and client and return the webook | boolean
 * @param (discord channel) takes a discord channel object
 * @param (client) takes a discord client obj
 * @returns (webook | boolean ) return webook if created, false if fails
 * */
async function createWebhook(channel, client) {
    try {
        const webook = await channel.createWebhook(`${client.user.username}`, {
            reason: "Needed for translation feature"
        });
        return webook;
    } catch (error) {
        console.log("Error creating webhook: ", error);
        return false;
    };
}


/**
 * 
 *
 *
 */
async function sendWebhookMessage(webhookClient, user, reaction, translatedText) {
    webhookClient.send({
        content: `${translatedText.text}`,
        username: `${user.displayName}`,
        avatarURL: `${user.displayAvatarURL}`,
    })
}

/** 
 * Takes a channel and client and check if theres a webhook for the channel and return it
 * @param (discord channel) takes a discord channel to send the message
 * @param (client) uses current client to check for ownership
 * @return (webhook | bool ) return webook if exsit or return false if it doesn't  
 * */
async function checkWebhook(channel, client) {
    try {
        const webhooks = await channel.fetchWebhooks();
        console.log(`Webhooks: ${webhooks}`);
        const botWebhook = webhooks.find(wh => wh.owner.id === client.user.id);
        return botWebhook;
    } catch (error) {
        console.log("Error fetching webhooks: ", error);
        return false;
    }
}


module.exports = { createWebhook, sendWebhookMessage, checkWebhook }
