const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const ms = require("ms");

let prefix = botconfig.prefix;

module.exports.run = async (bot, message, args) => {

    
    let botname = bot.user.tag;

    if(args[0] == "help") return message.channel.send(`Just do ${prefix}help instead.`)

    if(args[0]) {
        let command = args[0];
        if(bot.commands.has(command)) {
            command = bot.commands.get(command);
            var SHembed = new Discord.RichEmbed()
            .setColor("RANDOM")
            .setAuthor(`${botname} HELP`, message.guild.iconURL)
            .setThumbnail(bot.user.displayAvatarURL)
            .setDescription(`The bot prefix is: ${prefix}\n\n**Command:** ${command.config.name}\n**Description:** ${command.config.description || "No Description"}\n**Usage:** ${command.config.usage || "No Usage"}\n**Accessable by:** ${command.config.accessableby || "Members"}\n**Aliases:** ${command.config.noalias || command.config.aliases}`)
            message.channel.send(SHembed);
        }}

    if(!args[0]) {
        message.delete();
        let embed = new Discord.RichEmbed()
        .setAuthor(`Help Command!`, message.guild.iconURL)
        .setColor("RANDOM")
        .setDescription(`${message.author.username} check your dms!`)

        let Sembed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setAuthor(`${botname} Help`, message.guild.iconURL)
        .setThumbnail(bot.user.displayAvatarURL)
        .setTimestamp()
        .setDescription(`These are the avaliable commands for ${botname}!\nBot prefix is: ${prefix}`)
        .addField(`Commands:`, "``say`` ``clear`` ``meme`` ``help`` ``serverinfo`` ``botinfo`` ``kick`` ``ban`` ``report``")
        .setFooter("Test Bot 2k18", bot.user.displayAvatarURL)
        message.channel.send(embed).then(m => m.delete(10000));
        message.author.send(Sembed)
    }
}


module.exports.config = {
    name: "help",
    aliases: ["h", "commands"],
    usage: `${prefix}help or ${prefix} <command>`,
    description: "helps you to find all the bot commands",
    accessableby: "Members"
}