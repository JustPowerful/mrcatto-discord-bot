const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const ms = require("ms");



const bot = new Discord.Client({disableEveryone: false});

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online!`);
 bot.user.setStatus("") //online, idle, dnd, invisible
})
setInterval(async function() {

  let status = [`On ${bot.guilds.size} Server!`,`type .help`,`On ${bot.guilds.size} Server!`, `Type .meme ;)`, `On ${bot.guilds.size} Server!`, `Type .help`];
  let chosen = status[Math.floor(Math.random() * status.length)];

  bot.user.setActivity(chosen, {type: "STREAMING"}); //PLAYING, STREAMING, LISTENING, WATCHING

}, 10000);



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

    

 // chat responding
  
    if(message.content === `no u`){
      message.channel.send("https://images3.memedroid.com/images/UPLOADED731/5ab1fd5adac97.jpeg");
    }
  
    if(message.content === `moi`){
      message.channel.send("frrrenchhh :flag_fr: ");
    }
    


    ///Bot help command
    if(cmd === `${prefix}help`){

        let bothelpmsg = "Commands sent in a private DM :smiley: "
        let botembed = new Discord.RichEmbed()
        .setDescription(`${bot.user.tag} bot // help commands // command prefix is ${prefix}`)
        .setColor("RANDOM")
        .addField("botinfo", `Members : get more informations about the bot .`)
        .addField("serverinfo", `Members : get more infomations about the server .`)
        .addField("serverslist", `Members : show servers that are connected to this bot . `)
        .addField("clear <amount>", `Admins : clear a selected amount of messages .`)
        .addField("ban @member <reason>", `Admins : ban members , you need to create a log channel named "bans" `)
        .addField("kick @member <reason>", `Admins : kick members , you need to create a log channel named "kicks" `)
        .addField("report @member <reason>", `Members : you can report members for breaking the rules ! you need to create a log channel named "reports" `)
        .addField("say <message>", `Admins : make the bot say what you want .`)
        .addField("meme", `Members : make the bot say some random memes .`)
        .setFooter(`user id ${message.author.id} requested this command !`, message.author.displayAvatarURL);
          
      

        return message.member.send(botembed), message.channel.send(bothelpmsg);
    }
    
})

// bot.login(process.env.BOT_TOKEN);
bot.login("NzAzNzExMDc2Mzk4NzkyNzE0.XqSkDw.p1m48AZiJyG23NNI8Z_O_W80rpQ");
