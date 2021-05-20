const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const ms = require("ms");
const got = require("got");

let prefix = botconfig.prefix;

module.exports.run = async (bot, message, args) => {
  const embed = new Discord.RichEmbed();
  got("https://www.reddit.com/r/HENTAI_GIF/random/.json").then((response) => {
    let content = JSON.parse(response.body);
    let memeImage = content[0].data.children[0].data.url;
    message.channel.send(memeImage);
  });
};

module.exports.config = {
  name: "hentaigif", // you can you this as the original command
  aliases: ["hnetaigif", "hgif", "forppgif"], // or you can do it with multiple commands (try to type it with prefix)
  usage: `${prefix}hentaigif`,
  description: "Random hentai gif/videos",
  accessableby: "Members",
};
