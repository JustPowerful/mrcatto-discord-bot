const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
let prefix = botconfig.prefix;

const ytdl = require('ytdl-core')

const streamOptions = {
    seek: 0,
    volume: 1
}

module.exports.run = async (bot, message, args) => {

    let parameter = args[0]
    var voiceChannel = message.member.voiceChannel
    if (!voiceChannel) return message.channel.send("You're not in a voice channel, please join a voice channel before playing music.")


    if (parameter == "play")
    {
        let url = args[1]
        if (ytdl.validateURL(url))
        {
            console.log("Valid URL")
            var flag = bot.musicUrls.some(element => element === url);
            if (!flag) 
            {
                bot.musicUrls.push(url)
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
                            await playSong(bot, message.channel, voiceConnection, voiceChannel)
                        } catch(ex)
                        {
                            console.log(ex)
                        }
                    }
                } 
            }
        } else 
        {
            message.channel.send("Youtube URL is not correct, please check the URL before playing any audio.")
        }

    }
    
    else if (parameter == "skip")
    {
        if (bot.dispatcher) bot.dispatcher.end()
        else message.channel.send("Nothing is playing!")
    }

    else if (parameter == "leave")
    {
        voiceChannel.leave()
    }

    else {
        message.channel.send(`Can't find \`${parameter}\` in music parameters! please use \`${prefix}help music\` for more informations!`)
    }

    // let url = args[0]
    // let voiceChannel = message.member.voiceChannel
    // console.log("Voice channel", voiceChannel)
    
    // if (!voiceChannel) return message.channel.send("You're not in a voice channel, please join a voice channel before playing music.")


    // if (ytdl.validateURL(url))
    // {
    //     console.log("Valid URL")
    //     var flag = bot.musicUrls.some(element => element === url);
    //     if (!flag) 
    //     {
    //         bot.musicUrls.push(url)
    //         if(voiceChannel != null)
    //         {
    //             if (voiceChannel.connection)
    //             {
    //                 const embed = new Discord.RichEmbed();
    //                 embed.setAuthor(bot.user.username, bot.user.displayAvatarUrl);
    //                 embed.setDescription("You've successfully added url to queue!");
    //                 message.channel.send(embed)
    //             } else {
    //                 try 
    //                 {
    //                     const voiceConnection = await voiceChannel.join()
    //                     await playSong(bot, message.channel, voiceConnection, voiceChannel)
    //                 } catch(ex)
    //                 {
    //                     console.log(ex)
    //                 }
    //             }
    //         } 
    //     }
    // } else 
    // {
    //     message.channel.send("Youtube URL is not correct, please check the URL before playing any audio.")
    // }

}

async function playSong(bot, messageChannel, voiceConnection, voiceChannel) {
    const stream = ytdl(bot.musicUrls[0], {filter: 'audioonly'})
    bot.dispatcher = voiceConnection.playStream(stream, streamOptions)

    bot.dispatcher.on('end', () => {
        bot.musicUrls.shift();
        if (bot.musicUrls.length == 0)
            voiceChannel.leave()
        else
        {
            setTimeout(() => {
                playSong(bot, messageChannel, voiceConnection, voiceChannel)
            }, 5000)
        }
    })
}

module.exports.config = {
    name: "music", // you can you this as the original command
    aliases: ["m", "audio"], // or you can do it with multiple commands (try to type it with prefix)
    usage: `\n${prefix}music play <youtube URL> \n ${prefix}music skip\n${prefix}music leave`,
    description: "Use this command to play audio in voice channel",
    accessableby: "Members"
}