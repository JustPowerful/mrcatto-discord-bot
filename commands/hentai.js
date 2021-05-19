const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const ms = require("ms");
const got = require("got");

let prefix = botconfig.prefix;

module.exports.run = async (bot, message, args) => {
  const embed = new Discord.RichEmbed();
  got("https://www.reddit.com/r/hentai/random/.json").then((response) => {
    let content = JSON.parse(response.body);
    let permalink = content[0].data.children[0].data.permalink;
    let memeUrl = `https://reddit.com${permalink}`;
    let memeImage = content[0].data.children[0].data.url;
    let memeTitle = content[0].data.children[0].data.title;
    let memeUpvotes = content[0].data.children[0].data.ups;
    let memeDownvotes = content[0].data.children[0].data.downs;
    let memeNumComments = content[0].data.children[0].data.num_comments;
    embed.setTitle(`${memeTitle}`);
    embed.setURL(`${memeUrl}`);
    embed.setImage(memeImage);
    embed.setColor("RANDOM");
    embed.setFooter(
      `👍 ${memeUpvotes} 👎 ${memeDownvotes} 💬 ${memeNumComments}`
    );
    message.channel.send(embed);
  });
};

module.exports.config = {
  name: "hentai", // you can you this as the original command
  aliases: ["hnetai", "animeboobz"], // or you can do it with multiple commands (try to type it with prefix)
  usage: `${prefix}hentai`,
  description: "Random hentai",
  accessableby: "Members",
};
