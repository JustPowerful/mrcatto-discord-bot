const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const ms = require("ms");

let prefix = botconfig.prefix

module.exports.run = async (bot, message, args) => {
    //!report @ned reason
    
    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!rUser) return message.channel.send("I couldn't find user ! :confused: ")
    let reason = args.join(" ").slice(22);

    let reportEmbed = new Discord.RichEmbed()
    .setDescription("Reports : ")
    .setColor("#49FF00")
    .addField("Reported User : ", `${rUser} with ID ${rUser.id}`)
    .addField("Reported by : ", `${message.author} with the ID ${message.author.id}`)
    .addField("Channel : ", message.channel)
    .addField("Report time : ", message.createdAt)
    .addField("Reason : ", reason);
    
    let reportschannel = message.guild.channels.find(`name`, "reports");
    if(!reportschannel) return message.channel.send("I couldn't find reports channel ! :neutral_face: ");


    message.delete().catch(O_o=>{});
    reportschannel.send(reportEmbed);
    return;
}

module.exports.config = {
    name: "report", // you can you this as the original command
    aliases: ["expose"], // or you can do it with multiple commands (try to type it with prefix)
    usage: `${prefix}report <member> <reason>`,
    description: "Report members",
    accessableby: "Members"
}