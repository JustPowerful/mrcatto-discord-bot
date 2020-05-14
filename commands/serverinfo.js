const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const ms = require("ms");

let prefix = botconfig.prefix;

module.exports.run = async (bot, message, args) => {
    let sicon = message.guild.displayAvatarURL;
    let verificationLevel = message.guild.verificationLevel;
    let verificationLevels = ['None', 'Low', 'Medium', 'High', 'Extreme']
    let serverembed = new Discord.RichEmbed()
    .setDescription(`Server Inforamtions // ${bot.user.username}.`)
    .setColor("RANDOM")
    .addField(":punch: Server name :punch:", message.guild.name)
    .addField(":id: server ID :id:", `${message.guild.id}`, true)
    .addField(":id: Owner ID :id:", `${message.guild.owner.id}`, true)
    .addField(":id: Your ID :id:", `${message.author.id}`, true)
    .addField(":computer: Verification Level :computer:", `${verificationLevels[message.guild.verificationLevel]}`, true)
    .addField(":flag_white: Server Region :flag_white:", `${message.guild.region}`, true)
    .addField(":radio_button: Channels :radio_button:", `${message.guild.channels.filter(channel => channel.type === `voice`).size} voice / ${message.guild.channels.filter(channel => channel.type === `text`).size} text`, true)
    .addField(":date: Creation date :date:",`The creation date of the server is **${botconfig.Date_Name[message.guild.createdAt.toString().split(" ")[1]]}** **${message.guild.createdAt.toString().split(" ")[2]}**, **${message.guild.createdAt.toString().split(" ")[3]}**!`,false)
    .addField(":watch: You joined On :watch:", `Joining date is **${botconfig.Date_Name[message.member.joinedAt.toString().split(" ")[1]]}** **${message.member.joinedAt.toString().split(" ")[2]}**, **${message.member.joinedAt.toString().split(" ")[3]}**!`,false)
    .addField(":headphones: Members :headphones:", `${message.guild.members.filter(member => member.user.bot).size} bot of ${message.guild.memberCount} members`)
    .setFooter(`user id ${message.author.id} requested this command !`, message.author.displayAvatarURL);

    return message.channel.send(serverembed);
}

module.exports.config = {
    name: "serverinfo", // you can you this as the original command
    aliases: ["sinfo"], // or you can do it with multiple commands (try to type it with prefix)
    usage: `${prefix}serverinfo`,
    description: "Show server informations",
    accessableby: "Members"
}