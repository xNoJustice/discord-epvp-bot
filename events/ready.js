require("dotenv").config();

module.exports = {
  name: "ready",
  once: true,

  run(client) {
    console.log(
      `> ✅ • Ready as ${client.user.tag}! ${new Date()} to serve in ${
        client.channels.cache.size
      } channels on ${client.guilds.cache.size} servers, for a total of ${
        client.users.cache.size
      } users.`,
    );
  },
};
