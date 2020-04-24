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

bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    let prefix = botconfig.prefix;
    let sender = message.author;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);
    
 // chat responding
  
    if(message.content === `no u`){
      message.channel.send("https://images3.memedroid.com/images/UPLOADED731/5ab1fd5adac97.jpeg");
    }
  
    if(message.content === `moi`){
      message.channel.send("frrrenchhh :flag_fr: ");
    }
    
//kick command 
    if(cmd === `${prefix}kick`){

        
        let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!kUser) return message.channel.send("I couldn't find that user :open_mouth: !");
        let kReason = args.join(" ").slice(22);
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You don't have permissions ! oof...");
        if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be kicked ! :sunglasses: ");

        let kickEmbed = new Discord.RichEmbed()
        .setDescription("~Kick~")
        .setColor("#FF8300")
        .addField("Kicked User", `${kUser} With the ID ${kUser.id}`)
        .addField("Kicked by", `${message.author} with the ID ${message.author.id}`)
        .addField("Kicked in", message.channel)
        .addField("Time", message.createdAt)
        .addField("Reason", kReason);

        let kickChannel = message.guild.channels.find(`name`, "kicks");
        if(!kickChannel) return message.channel.send("Cannot find kicks channel .");

        message.guild.member(kUser).kick(kReason);
        kickChannel.send(kickEmbed);

        return;
    }



    // ban command .
    if(cmd === `${prefix}ban`){

        let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!bUser) return message.channel.send("I couldn't find that user :open_mouth: !");
        let bReason = args.join(" ").slice(22);
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You don't have any permissions , oof...");
        if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be banned :sunglasses: !");

        let banEmbed = new Discord.RichEmbed()
        .setDescription("~Ban~")
        .setColor("#FF8300")
        .addField("Banned User", `${bUser} With the ID ${bUser.id}`)
        .addField("Banned by", `${message.author} with the ID ${message.author.id}`)
        .addField("Banned in", message.channel)
        .addField("Time", message.createdAt)
        .addField("Reason", bReason);

        let banChannel = message.guild.channels.find(`name`, "bans");
        if(!banChannel) return message.channel.send("Cannot find bans channel .");

        message.guild.member(bUser).ban(bReason);
        banChannel.send(banEmbed);

        return;
    }
    

    if(cmd === `${prefix}report`){
    
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
    
    ///make the bot say hello!
    if(cmd === `${prefix}hello`){
        return message.channel.send("Hello!")
    }

  //Say command 
  if(cmd === `${prefix}say`){
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You don't have permissions , oof ...");
    let botmessage = args.join(" ");
    message.delete().catch();
    message.channel.send(botmessage);
  }
  
  //Random meme command
    if(cmd === `${prefix}meme`){
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
      
  ///SERVER INFo
    if(cmd === `${prefix}serverinfo`){

        let sicon = message.guild.displayAvatarURL;
        let verificationLevel = message.guild.verificationLevel;
        let verificationLevels = ['None', 'Low', 'Medium', 'High', 'Extreme']
        let serverembed = new Discord.RichEmbed()
        .setDescription(`Server Inforamtions // ${bot.user.tag}.`)
        .setColor("RANDOM")
        .addField(":punch: Server name :punch:", message.guild.name)
        .addField(":id: server ID :id:", `${message.guild.id}`, true)
        .addField(":id: Owner ID :id:", `${message.guild.owner.id}`, true)
        .addField(":id: Your ID :id:", `${message.author.id}`, true)
        .addField(":computer: Verification Level :computer:", `${verificationLevels[message.guild.verificationLevel]}`, true)
        .addField(":flag_white: Server Region :flag_white:", `${message.guild.region}`, true)
        .addField(":radio_button: Channels :radio_button:", `${message.guild.channels.filter(channel => channel.type === `voice`).size} voice / ${message.guild.channels.filter(channel => channel.type === `text`).size} text`, true)
        .addField(":date: Creation date :date:",`The creation date of the server is **${botconfig.Date_Name[message.guild.createdAt.toString().split(" ")[1]]}** **${message.guild.createdAt.toString().split(" ")[2]}**, **${message.guild.createdAt.toString().split(" ")[3]}**!`,false)
        .addField(":watch: You joined On :watch:", `Joining date is **${botconfig.Date_Name[message.member.joinedAt.toString().split(" ")[1]]}** **${message.member.joinedAt.toString().split(" ")[2]}**, **${message.member.joinedAt.toString().split(" ")[3]}**!`,false)
        .addField(":headphones: Members :headphones:", `${message.guild.members.filter(member => member.user.bot).size} bot of ${message.guild.memberCount} members`)
        .setFooter(`user id ${message.author.id} requested this command !`, message.author.displayAvatarURL);

        return message.channel.send(serverembed);
    }



    ///Bot info 
    if(cmd === `${prefix}botinfo`){

        let bicon = bot.user.displayAvatarURL;
        let botembed = new Discord.RichEmbed()
        .setDescription(`${bot.user.tag} bot info :`)
        .setThumbnail(bicon)
        .setColor("#RANDOM")
        .addField(":robot: Name :robot: :", bot.user.username)
        .addField(":date: Creation date :date: :",`The bot was created on **${botconfig.Date_Name[bot.user.createdAt.toString().split(" ")[1]]}** **${bot.user.createdAt.toString().split(" ")[2]}**, **${bot.user.createdAt.toString().split(" ")[3]}**!`,false)
        .addField(":electric_plug: Online On :electric_plug: :", ` ~ ${bot.guilds.size} ~ servers .`)
        .addField(":bust_in_silhouette: Created by :bust_in_silhouette: :", ` JustPowerful `)
        .setFooter(`user id ${message.author.id} requested this command !`, message.author.displayAvatarURL);

        return message.channel.send(botembed);
    }

  //Show server that are connected to the bot
    if(cmd === `${prefix}serverslist`){
      let servers_list = `The bot is located on ** ${bot.guilds.size} ** servers : ${bot.guilds.map(members => members).join(",\n")}`;
      let bicon_list = bot.user.displayAvatarURL;
      let serversembed = new Discord.RichEmbed()
      .setThumbnail(bicon_list)
      .setDescription(`${bot.user.tag} servers list :`)
      .addField("Servers List :", servers_list)
      .setColor("RANDOM")
      .setFooter(`user id ${message.author.id} requested this command !`, message.author.displayAvatarURL);
           
      
      
      return message.channel.send(serversembed);
    }
  
  // Clear command
    if(cmd === `${prefix}clear`){
      
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

bot.login(process.env.BOT_TOKEN);
