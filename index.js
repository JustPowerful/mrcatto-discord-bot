const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const ms = require("ms");

// DOTENV :: ENVIRONEMENT VARIABLES SETUP
require('dotenv').config()


const bot = new Discord.Client({disableEveryone: false});

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online!`);

  setInterval(async function() {

    let status = [`${bot.guilds.size} Servers!`,`.help`, `JustPowerful my owner`, `my comrades`];
    let chosen = status[Math.floor(Math.random() * status.length)];
  
    bot.user.setActivity(chosen, {type: "LISTENING"}); //PLAYING, STREAMING, LISTENING, WATCHING
  
  }, 10000);
})

// MUSIC GLOBAL VARIABLES
bot.musicUrls = [] // QUEUE
bot.dispatcher = null // CURRENT PLAYING DISPATCHER


const fs = require("fs");
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {
  if(err) console.log(err)

  let jsfile = files.filter(f => f.split(".").pop() === "js")

  if(jsfile.length <= 0){
    return console.log("[LOG] Coundn't find commands !");
  }

  jsfile.forEach((f,i) => {
    let pull = require(`./commands/${f}`);
    bot.commands.set(pull.config.name, pull);
    pull.config.aliases.forEach(alias => {
      bot.aliases.set(alias, pull.config.name)
    })
  });

});




bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    let prefix = botconfig.prefix;
    let sender = message.author;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);


    // command files
    if(!message.content.startsWith(prefix)) return;
    let commandfile = bot.commands.get(cmd.slice(prefix.length)) || bot.commands.get(bot.aliases.get(cmd.slice(prefix.length)))
    if (commandfile) commandfile.run(bot, message, args)
    
    
})

bot.login(process.env.BOT_TOKEN);