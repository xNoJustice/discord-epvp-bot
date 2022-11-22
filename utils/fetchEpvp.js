const { EmbedBuilder } = require("discord.js");
const request = require("request-promise");
const cheerio = require("cheerio");
const URL = "https://www.elitepvpers.com/forum/metin2-trading/";

module.exports.fetchEpvp = async (client, guildId, channelId, page) => {
  console.log(page, `${URL}index${page}.html`);
  let pageURL = page ? `${URL}index${page}.html` : URL;
  const result = await request.get(pageURL);
  const $ = await cheerio.load(result);

  const sellBuyTrade = msg => {
    if (msg.includes("Selling")) {
      return "[Selling] ";
    }
    if (msg.includes("Buying")) {
      return "[Buying] ";
    }
    if (msg.includes("Trading")) {
      return "[Trading] ";
    }
    return "";
  };
  const guild = client.guilds.cache.find(guild => guild.id === guildId);
  const channel = guild.channels.cache.find(
    channel => channel.id === channelId,
  );

  $("#threadbits_forum_470 > tr").each((i, el) => {
    let name = $(el)
      .find("td:nth-child(3) > div:nth-child(1) > a:nth-child(1)")
      .text();
    let status = sellBuyTrade(
      $(el).find("td:nth-child(3) > div:nth-child(1)").text(),
    );
    if (name && name !== undefined) {
      name = status + name;
      const link =
        "https://www.amazon.in" +
        $(el)
          .find("td:nth-child(3) > div:nth-child(1) > a:nth-child(1)")
          .attr("href");
      channel.send({
        embeds: [
          new EmbedBuilder()
            .setColor("#0099ff")
            .setDescription(`[${name}](${link})`),
        ],
      });
    }
    if (!name) {
      name = $(el)
        .find("td:nth-child(3) > div:nth-child(1) > a:nth-child(2)")
        .text();
      if (name && name !== undefined) {
        name = status + name;
        const link =
          "https://www.amazon.in" +
          $(el)
            .find("td:nth-child(3) > div:nth-child(1) > a:nth-child(2)")
            .attr("href");
        channel.send({
          embeds: [
            new EmbedBuilder()
              .setColor("#0099ff")
              .setDescription(`[${name}](${link})`),
          ],
        });
      }
    }
  });
};
