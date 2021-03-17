const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const ms = require("ms");
const got = require("got");

let prefix = botconfig.prefix;

module.exports.run = async (bot, message, args) => {
  let query = args.join(" ")
  got(`https://api.jikan.moe/v3/search/anime?q=${query}`)
  .then(response => JSON.parse(response.body))
  .then(data => {
    // console.log(data.results[0])
    let anime = data.results[0]
    let embed = new Discord.RichEmbed();
    embed.setTitle(`${anime.title}`);
    embed.setURL(`${anime.url}`)
    embed.setDescription(`${anime.synopsis}`)
    embed.setImage(anime.image_url)
    embed.setColor("RANDOM")
    embed.addField("Members :", `${anime.members}`)
    embed.addField("Rating :", `${anime.score}`)
    embed.addField("Status:", `${anime.airing ? "Airing" : "Complete"}`)
    
    message.channel.send(embed)
  })
};

module.exports.config = {
  name: "anime", // you can you this as the original command
  aliases: ["mal", "myanimelist", "searchanime"], // or you can do it with multiple commands (try to type it with prefix)
  usage: `${prefix}anime <anime name>`,
  description: "Searches for the given anime",
  accessableby: "Members",
};
