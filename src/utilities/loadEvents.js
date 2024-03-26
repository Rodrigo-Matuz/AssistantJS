const fs = require("node:fs");
const path = require("node:path");

const eventsPath = path.join(__dirname, "../events");
const eventFiles = fs
    .readdirSync(eventsPath)
    .filter((file) => file.endsWith(".js"));

function loadEvents(client) {
    for (const file of eventFiles) {
        const filePath = path.join(eventsPath, file);
        const event = require(filePath);
        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args));
        } else {
            client.on(event.name, (...args) => event.execute(...args));
        }
        client.events.set(event.name, event);
    }
}

module.exports = { loadEvents };
