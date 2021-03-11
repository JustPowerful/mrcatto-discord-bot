const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
let prefix = botconfig.prefix;

const ytdl = require('ytdl-core')

const streamOptions = {
    seek: 0,
    volume: 1
}

var musicUrls = []

module.exports.run = async (bot, message, args) => {
    let url = args[0]
    let voiceChannel = message.member.voiceChannel
    console.log("Voice channel", voiceChannel)
    
    if (!voiceChannel) return message.channel.send("You're not in a voice channel, please join a voice channel before playing music.")


    if (ytdl.validateURL(url))
    {
        console.log("Valid URL")
        var flag = musicUrls.some(element => element === url);
        if (!flag) 
        {
            musicUrls.push(url)
            if(voiceChannel != null)
            {
                if (voiceChannel.connection)
                {
                    const embed = new Discord.RichEmbed();
                    embed.setAuthor(bot.user.username, bot.user.displayAvatarUrl);
                    embed.setDescription("You've successfully added url to queue!");
                    message.channel.send(embed)
                } else {
                    try 
                    {
                        const voiceConnection = await voiceChannel.join()
                        await playSong(message.channel, voiceConnection, voiceChannel)
                    } catch(ex)
                    {
                        console.log(ex)
                    }
                }
            } 
        }
    } else 
    {
        console.log("URL NOT VALID")
    }

}

async function playSong(messageChannel, voiceConnection, voiceChannel) {
    const stream = ytdl(musicUrls[0], {filter: 'audioonly'})
    const dispatcher = voiceConnection.playStream(stream, streamOptions)
    dispatcher.on('end', () => {
        musicUrls.shift();

        if (musicUrls.length == 0)
            voiceChannel.leave()
        else
        {
            setTimeout(() => {
                playSong(messageChannel, voiceConnection, voiceChannel)
            }, 5000)
        }
    })
}

module.exports.config = {
    name: "play", // you can you this as the original command
    aliases: ["p", "pm"], // or you can do it with multiple commands (try to type it with prefix)
    usage: `${prefix}play <youtube link>`,
    description: "Play music from youtube link",
    accessableby: "Members"
}