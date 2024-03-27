const { Client, GatewayIntentBits, Collection, Partials } = require("discord.js");
const { loadCommands } = require("./src/utilities/loadCommands.js");
const { loadEvents } = require("./src/utilities/loadEvents.js");
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions
    ],
    partials: [
        Partials.Message,
        Partials.Channel,
        Partials.Reaction
    ]
});
const { config } = require("dotenv");

client.commands = new Collection();
client.events = new Collection();
loadCommands(client);
loadEvents(client);

config();
const TOKEN = process.env.DISCORD_TOKEN;
client.login(TOKEN);
