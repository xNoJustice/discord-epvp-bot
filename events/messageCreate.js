const { fetchEpvp } = require("../utils/fetchEpvp");
require("dotenv").config();

module.exports = {
  name: "messageCreate",

  async run(client, message) {
    if (!message.content.startsWith(process.env.PREFIX) || message.author.bot)
      return;
    const args = message.content
      .slice(process.env.PREFIX.length)
      .trim()
      .split(/ +/);
    const commandName = args.shift().toLowerCase();

    if (commandName === "epvp") {
      let msg = message.content
        .slice(process.env.PREFIX.length + commandName.length)
        .trim();
      fetchEpvp(client, message.guildId, message.channelId, msg);
    }
  },
};
