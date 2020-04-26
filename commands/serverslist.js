const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const ms = require("ms");

let prefix = botconfig.prefix;

module.exports.run = async (bot, message, args) => {
    let servers_list = `The bot is located on ** ${bot.guilds.size} ** servers : ${bot.guilds.map(members => members).join(",\n")}`;
    let bicon_list = bot.user.displayAvatarURL;
    let serversembed = new Discord.RichEmbed()
    .setThumbnail(bicon_list)
    .setDescription(`${bot.user.tag} servers list :`)
    .addField("Servers List :", servers_list)
    .setColor("RANDOM")
    .setFooter(`user id ${message.author.id} requested this command !`, message.author.displayAvatarURL);
        
    
    
    return message.channel.send(serversembed);
}

module.exports.config = {
    name: "serverslist", // you can you this as the original command
    aliases: ["slist"], // or you can do it with multiple commands (try to type it with prefix)
    usage: `${prefix}serverslist`,
    description: "A list of servers that are using the bot",
    accessableby: "Members"
}