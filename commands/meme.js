const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const ms = require("ms");
const fetch = require('node-fetch');

let prefix = botconfig.prefix;

module.exports.run = async (bot, message, args) => {
    // var answers = [
    // //STOLEN MEMES :>
    // 'https://i.imgur.com/VZWjqRg.gif', 
    // 'https://i.imgur.com/JPkb63K.gif', 
    // 'https://i.imgur.com/oAgfVFs.gif', 
    // 'https://i.imgur.com/J4XDQwz.jpg', 
    // 'https://i.imgur.com/sM70naA.jpg', ,
    // 'https://media.giphy.com/media/xfK5dGHMBHlwQ/giphy.gif',
    // 'https://media.giphy.com/media/xT8petzy1xUhAkaVqw/source.gif',
    // 'https://media.giphy.com/media/idRtEh8Klnnd0J8RG0/giphy.gif',
    // 'https://media.giphy.com/media/5JEWBLv0mZDYA/source.gif',
    // 'https://media.giphy.com/media/dXRNE6UeGPcD3vlWXy/giphy.gif'

    // ];
    
    // var answer = answers[Math.floor(Math.random() * answers.length)];
    
    
    // let meme_embed = new Discord.RichEmbed()
    // .setDescription("funny things only :ok_hand: ... ")
    // .setImage(answer)
    // .setColor("RANDOM")
    // .setFooter(`user id ${message.author.id} requested this command !`, message.author.displayAvatarURL);

    // message.channel.send(meme_embed);

    let msg = await message.channel.send("Generating...")

//     fetch("https://apis.duncte123.me/meme")
//     .then(res => res.json()).then(body => {
//         if(!body) return message.reply("whoops! I've broke, try again!")

//         let mEmbed = new Discord.RichEmbed()
//         .setColor("RANDOM")
//         .setAuthor(`${bot.user.username} MEMES!`, message.guild.iconURL)
//         .setImage(body.data.image)
//         .setTimestamp()
//         .setFooter(bot.user.username.toUpperCase(), bot.user.displayAvatarURL);


//             message.channel.send(mEmbed);
//             msg.delete();
//     });
    
    fetch('https://apis.duncte123.me/meme', 
        {
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.152 Safari/537.36'
        }
     )
    .then(response => response.text())
    .then(data => {
        console.log(data)
         let mEmbed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setAuthor(`${bot.user.username} MEMES!`, message.guild.iconURL)
        .setImage(data.data.image)
        .setTimestamp()
        .setFooter(bot.user.username.toUpperCase(), bot.user.displayAvatarURL);


            message.channel.send(mEmbed);
            msg.delete();
    })
        
}

module.exports.config = {
    name: "meme", // you can you this as the original command
    aliases: ["dankmemes"], // or you can do it with multiple commands (try to type it with prefix)
    usage: `${prefix}meme`,
    description: "Random memes",
    accessableby: "Members"
}
