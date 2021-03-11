const Discord = require('discord.js')
const botconfig = require("../botconfig.json")

let prefix = botconfig.prefix;

module.exports.run = async (bot, message, args) =>
{
    const myemoji = bot.emojis.find(emoji => emoji.name === args[0])

    if (!myemoji) return message.channel.send(`Can't find emoji \`${args[0]}\` in this guild!`)

    message.delete().catch()
    message.channel.send(`${myemoji}`)
    message.channel.send(`${message.member.user.tag} sent \`${args[0]}\` emoji.`)
}

module.exports.config = {
    name: "emoji", // you can you this as the original command
    aliases: ["sendemoji", "semoji", "dropemoji"], // or you can do it with multiple commands (try to type it with prefix)
    usage: `${prefix}emoji`,
    description: "Send an emoji from the guild (Nitro included)",
    accessableby: "Members"
}