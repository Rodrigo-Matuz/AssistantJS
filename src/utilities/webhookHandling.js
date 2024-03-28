

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

async function sendWebhookMessage(webhookClient) {
    webhookClient.send({
        content: `${}`,
        username: `${}`,
        avatarURL: `${}`,
    })
}

async function checkWebhook(channel, client) {
    try {
        const webhooks = await channel.fetchWebhooks();
        const botWebhook = webhooks.find(wh => wh.owner.id === client.user.id);
        return botWebhook;
    } catch (error) {
        console.log("Error fetching webhooks: ", error);
        return false;
    }
}


module.exports = { createWebhook, sendWebhookMessage, checkWebhook }
