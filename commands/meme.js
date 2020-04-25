const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const ms = require("ms");


module.exports.run = async (bot, message, args) => {
    var answers = [
    //STOLEN MEMES :>
    'https://i.imgur.com/VZWjqRg.gif', 
    'https://i.imgur.com/JPkb63K.gif', 
    'https://i.imgur.com/oAgfVFs.gif', 
    'https://i.imgur.com/eo6zWKH.png',
    'https://i.imgur.com/J4XDQwz.jpg', 
    'https://i.imgur.com/sM70naA.jpg', 
    'https://media.giphy.com/media/V46sLZRVrOUXm/giphy.gif',
    'https://media.giphy.com/media/xfK5dGHMBHlwQ/giphy.gif',
    'https://media.giphy.com/media/10kz4l61LXP2XS/giphy.gif',
    'https://media.giphy.com/media/xT8petzy1xUhAkaVqw/source.gif',
    'https://media.giphy.com/media/Vkp96Z8Lm7fJm/giphy.gif'
    
    
    ];
    
    var answer = answers[Math.floor(Math.random() * answers.length)];
    
    
    let meme_embed = new Discord.RichEmbed()
    .setDescription("funny things only :ok_hand: ... ")
    .setImage(answer)
    .setColor("RANDOM")
    .setFooter(`user id ${message.author.id} requested this command !`, message.author.displayAvatarURL);

    message.channel.send(meme_embed);
        
}

module.exports.config = {
    name: "meme", // you can you this as the original command
    aliases: [] // or you can do it with multiple commands (try to type it with prefix)
}