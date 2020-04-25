const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const ms = require("ms");


module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You don't have permissions , oof ...");
    let botmessage = args.join(" ");
    message.delete().catch();
    message.channel.send(botmessage);
}

module.exports.config = {
    name: "say", // you can you this as the original command
    aliases: [] // or you can do it with multiple commands (try to type it with prefix)
}