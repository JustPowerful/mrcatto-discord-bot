const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const ms = require("ms");


let prefix = botconfig.prefix;

module.exports.run = async (bot, message, args) => {
    let bicon = bot.user.displayAvatarURL;
    let botembed = new Discord.RichEmbed()
    .setDescription(`${bot.user.tag} bot info :`)
    .setThumbnail(bicon)
    .setColor("#RANDOM")
    .addField(":robot: Name :robot: :", bot.user.username)
    .addField(":date: Creation date :date: :",`The bot was created on **${botconfig.Date_Name[bot.user.createdAt.toString().split(" ")[1]]}** **${bot.user.createdAt.toString().split(" ")[2]}**, **${bot.user.createdAt.toString().split(" ")[3]}**!`,false)
    .addField(":electric_plug: Online On :electric_plug: :", ` ~ ${bot.guilds.size} ~ servers .`)
    .addField(":bust_in_silhouette: Created by :bust_in_silhouette: :", ` JustPowerful `)
    .setFooter(`user id ${message.author.id} requested this command !`, message.author.displayAvatarURL);

    return message.channel.send(botembed);
}

module.exports.config = {
    name: "botinfo", // you can you this as the original command
    aliases: ["binfo"], // or you can do it with multiple commands (try to type it with prefix)
    usage: `${prefix}botinfo`,
    description: "Show bot informations",
    accessableby: "Members"
}