const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const ms = require("ms");


module.exports.run = async (bot, message, args) => {
    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!kUser) return message.channel.send("I couldn't find that user :open_mouth: !");
    let kReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You don't have permissions ! oof...");
    if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be kicked ! :sunglasses: ");

    let kickEmbed = new Discord.RichEmbed()
    .setDescription("~Kick~")
    .setColor("#FF8300")
    .addField("Kicked User", `${kUser} With the ID ${kUser.id}`)
    .addField("Kicked by", `${message.author} with the ID ${message.author.id}`)
    .addField("Kicked in", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reason", kReason);

    let kickChannel = message.guild.channels.find(`name`, "kicks");
    if(!kickChannel) return message.channel.send("Cannot find kicks channel .");

    message.guild.member(kUser).kick(kReason);
    kickChannel.send(kickEmbed);

    return;
}

module.exports.config = {
    name: "kick", // you can you this as the original command
    aliases: [] // or you can do it with multiple commands (try to type it with prefix)
}