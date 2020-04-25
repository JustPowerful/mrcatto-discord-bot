const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const ms = require("ms");


module.exports.run = async (bot, message, args) => {
    let clear_message = `Oofed ${args[0]} messages :yum: .`;
    let clear_embed = new Discord.RichEmbed()
    
    .setDescription(`${message.author} Cleared some messages !`)
    .addField(clear_message)
    .setColor("RANDOM")
    .setFooter(`user id ${message.author.id} requested this command !`, message.author.displayAvatarURL);
    
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Oof , you can't :ok_hand: !");
    if(!args[0]) return message.channel.send("How many ? Im comfused , oof ...");
    message.channel.bulkDelete(args[0]).then(() => {
    message.channel.send(clear_embed).then(msg => msg.delete(5000));
    })
}

module.exports.config = {
    name: "clear", // you can you this as the original command
    aliases: [] // or you can do it with multiple commands (try to type it with prefix)
}