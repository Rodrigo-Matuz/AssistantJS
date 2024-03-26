const { Client, GatewayIntentBits, Collection } = require("discord.js");
const { loadCommands } = require("./src/utilities/loadCommands.js");
const { loadEvents } = require("./src/utilities/loadEvents.js");
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const { config } = require("dotenv");

client.commands = new Collection();
client.events = new Collection();
loadCommands(client);
loadEvents(client);

config();
const TOKEN = process.env.DISCORD_TOKEN;
client.login(TOKEN);
