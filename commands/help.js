const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const ms = require("ms");

let prefix = botconfig.prefix;

module.exports.run = async (bot, message, args) => {

    
    let error = null;


    if(args[0] == "help") return message.channel.send(`Just do ${prefix}help instead.`)

    if(args[0]) {
        let command = args[0];
        if(bot.commands.has(command)) {
            command = bot.commands.get(command);
            var SHembed = new Discord.RichEmbed()
            .setColor("RANDOM")
            .setAuthor(`${bot.user.username} HELP`, message.guild.iconURL)
            .setThumbnail(bot.user.displayAvatarURL)
            .setDescription(`The bot prefix is: ${prefix}\n\n**Command:** ${command.config.name}\n**Description:** ${command.config.description || "No Description"}\n**Usage:** ${command.config.usage || "No Usage"}\n**Accessable by:** ${command.config.accessableby || "Members"}\n**Aliases:** ${command.config.noalias || command.config.aliases}`)
            message.channel.send(SHembed);
        }}

    if(!args[0]) {
        message.delete();
        let bothelpmsg = "Commands sent in a private DM :smiley:"
        let Sembed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setAuthor(`${bot.user.username} Help`, message.guild.iconURL)
        .setThumbnail(bot.user.displayAvatarURL)
        .setTimestamp()
        .setDescription(`These are the avaliable commands for ${bot.user.username}!\nBot prefix is: ${prefix}`)
        .addField(`Commands:`, "``say`` ``clear`` ``meme`` ``help`` ``serverinfo`` ``botinfo`` ``kick`` ``ban`` ``report``")
        .setFooter("BETA V1.0.3", bot.user.displayAvatarURL)
        
        
        message.channel.send(bothelpmsg);
        // if the bot can't send the message to the user
        // that means that the user disable direct messages from server members
        
        message.member.send(Sembed).catch(err => {
            if(err){
                message.channel.send("[Error]: Please enable direct messages from server members .");
            }
        });
        
        
        
            
        
    }
}


module.exports.config = {
    name: "help",
    aliases: ["h", "commands"],
    usage: `${prefix}help or ${prefix} <command>`,
    description: "helps you to find all the bot commands",
    accessableby: "Members"
}