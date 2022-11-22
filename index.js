const {
  Client,
  GatewayIntentBits,
  Collection,
} = require("discord.js");
const { readdirSync } = require("fs");
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});
require("dotenv").config();

module.exports = client;

client.events = new Collection();

const eventFiles = readdirSync("./events").filter(file => file.endsWith(".js"));

for (const file of eventFiles) {
  const event = require(`./events/${file}`);
  client.events.set(event.name, event);
}

client.on("ready", () => {
  const event = client.events.get("ready");
  event.run(client);
});

client.on("messageCreate", message => {
  const event = client.events.get("messageCreate");
  event.run(client, message);
});

process.on("unhandledRejection", error =>
  console.log("UNHANDLED_REJECTION\n" + error, "error"),
);
process.on("uncaughtException", error => {
  console.log("UNCAUGHT_EXCEPTION\n" + error, "error");
});

client.login(process.env.TOKEN);
