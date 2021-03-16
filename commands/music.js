const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
let prefix = botconfig.prefix;

const getytid = require('get-youtube-id')
const fetchVideoInfo = require('youtube-infofix')
// const yt = require('youtube.get-video-info')
// const getyttitle = require('get-youtube-title')

const YouTube = require('youtube-node')
const youtube = new YouTube()
youtube.setKey(process.env.YOUTUBE_TOKEN) // process.env.YOUTUBE_TOKEN

const ytdl = require('ytdl-core');

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
                            let voiceConnection = await voiceChannel.join()
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
            let newArgs = [...args]
            newArgs.shift() // removes the parameter from the search
            let searchQuery = newArgs.join(" ")
            console.log(searchQuery)
            youtube.search(searchQuery, 1, async function(error, results) {
                if (error) throw error
                let videoId = results.items[0].id.videoId
                let videoUrl = `http://www.youtube.com/watch?v=${videoId}`
                var flag = bot.musicUrls.some(element => element === url);
                if(!flag)
                {
                    bot.musicUrls.push(videoUrl)
                    if(voiceChannel != null)
                    {
                        if(voiceChannel.connection)
                        {
                            const embed = new Discord.RichEmbed();
                            embed.setAuthor(bot.user.username, bot.user.displayAvatarUrl);
                            embed.setDescription("You've successfully added url to queue!");
                            message.channel.send(embed)
                        } else {
                            try 
                            {
                                let voiceConnection = await voiceChannel.join()
                                await playSong(bot, message.channel, voiceConnection, voiceChannel)
                            } catch(ex)
                            {
                                console.log(ex)
                            } 
                        }
                    }
                }

            })


        }

    }
    
    else if (parameter == "skip")
    {
        if (bot.dispatcher) {
            message.channel.send(":fast_forward: Skipping current song!")
            bot.dispatcher.end()
        }
        else message.channel.send(":x: Nothing is playing!")
    }

    else if (parameter == "leave")
    {
        voiceChannel.leave()
    }

    else if (parameter == "queuelist")
    {
        if(bot.musicUrls.length > 0)
        {
            let fieldMsg = bot.musicUrls.join('\n')
            let embed = new Discord.RichEmbed();
            embed.setColor("RANDOM")
            embed.setThumbnail(bot.user.displayAvatarURL)
            embed.setAuthor(bot.user.username, bot.user.displayAvatarUrl)
            embed.addField('Queued songs : ', fieldMsg)
            message.channel.send(embed)
        } else {
            message.channel.send(":clock10: Nothing left on the queue.")
        }
    }

    else {
        message.channel.send(`Can't find \`${parameter}\` in music parameters! please use \`${prefix}help music\` for more informations!`)
    }

}

async function playSong(bot, messageChannel, voiceConnection, voiceChannel) {
    let embed = new Discord.RichEmbed();
    embed.setColor("RANDOM")
    embed.setThumbnail(bot.user.displayAvatarURL)
    embed.setAuthor(bot.user.username, bot.user.displayAvatarUrl)
    embed.addField('Current song : ', bot.musicUrls[0])
    messageChannel.send(embed)

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
    usage: `\n${prefix}music play <youtube URL> \n ${prefix}music skip\n${prefix}music leave\n${prefix}music queuelist`,
    description: "Use this command to play audio in voice channel",
    accessableby: "Members"
}