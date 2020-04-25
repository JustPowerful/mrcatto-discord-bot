const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const ms = require("ms");


module.exports.run = async (bot, message, args) => {
    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!bUser) return message.channel.send("I couldn't find that user :open_mouth: !");
    let bReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You don't have any permissions , oof...");
    if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be banned :sunglasses: !");

    let banEmbed = new Discord.RichEmbed()
    .setDescription("~Ban~")
    .setColor("#FF8300")
    .addField("Banned User", `${bUser} With the ID ${bUser.id}`)
    .addField("Banned by", `${message.author} with the ID ${message.author.id}`)
    .addField("Banned in", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reason", bReason);

    let banChannel = message.guild.channels.find(`name`, "bans");
    if(!banChannel) return message.channel.send("Cannot find bans channel .");

    message.guild.member(bUser).ban(bReason);
    banChannel.send(banEmbed);

        return;
}

module.exports.config = {
    name: "ban", // you can you this as the original command
    aliases: [] // or you can do it with multiple commands (try to type it with prefix)
}