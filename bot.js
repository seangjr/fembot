const Discord = require('discord.js');
var Chance = require('chance');
const client = new Discord.Client();

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
  client.user.setPresence({
    status: 'online',
    activity: {
        name: "Sean sleep...",
        type: "WATCHING"
    }
});
});

const prefix = ">";

client.on("message", function (message) {

  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  const commandBody = message.content.slice(prefix.length);
  const args = commandBody.split(' ');
  const command = args.shift().toLowerCase();

  // roles
  let ganyuGrace = message.guild.roles.cache.find(r => r.id === "853529776307961856");
  let lovedByGod = message.guild.roles.cache.find(r => r.id === "853539423542968350");
  let gingerFav = message.guild.roles.cache.find(r => r.id === "853543265486897162");
  let simpRole = message.guild.roles.cache.find(r => r.id === "842010444478939146");
  let shame = message.guild.roles.cache.find(r => r.id === "841893441059553320");
  let rickrole = message.guild.roles.cache.find(r => r.id === "853588881441423371");
  let gachaAddict = message.guild.roles.cache.find(r => r.id === "853608039214612511");


  //member rolling function
  let member = message.member;

  //rick rolled link
  let rickroleMessage = new Discord.MessageEmbed()
      .setColor('#010101')
      .setTitle('Secret Gacha Prize')
      .setAuthor('Femboy Fox Bot', 'https://i.ibb.co/cCcBJKR/9265f52d2767dc5ebd15fc47ac980692.jpg')
      .addField("You won a secret gacha prize! Keep it secret at all costs.", "[Click here](https://www.youtube.com/watch?v=O91DT1pR1ew) to view the prize.")

  /**
   * gacha roles function
   * 
   */
  var chance = new Chance();
  var roll = function() {
      return chance.integer({ min: 1, max: 200 })
  }

  var pull = function() {

      var result = roll();

      //ganyu's grace
      if(result == 1 ) {
        member.roles.add(ganyuGrace);
          return `congrats <@${message.author.id}>! you just got the rarest <@&853529776307961856>!`;
      }
      //loved by GOD
      if(result >= 2 && result <= 4) {
        member.roles.add(lovedByGod);
          return `nice <@${message.author.id}> you're loved by GOD!`;
      }
      //gacha addict
      if (result >= 5 && result <= 7) {
        member.roles.add(gachaAddict);
          return 'why are you so addicted to this?! <@&853608039214612511> given. noice.';
      }
      //ginger fav
      if(result >= 8 && result <= 10) {
        member.roles.add(gingerFav);
          return "you're officially <@306794812282109953>'s favourite! :sparkles: :sparkles:";
      }
      //simp
      if(result >= 10 && result <= 15) {
        member.roles.add(simpRole);
        setTimeout(() => {
          member.roles.remove(simpRole);
        }, 1.728E+8);
          return 'lol simp! you got the simp role lmao haha';
      }
      
      if(result >= 16 && result <= 20) {
        return 'you almost got lucky <3 sadge';
      }

      //rick role
      if(result >= 21 && result <= 40) {
        member.roles.add(rickrole);
        setTimeout(() => {
          member.roles.remove(rickrole);
        }, 1.728E+8);
        message.author.send(rickroleMessage);
          return `No reward!`;
      }
            
      //mute
      if(result >= 41 && result <= 70) {
        member.roles.add(shame);
        setTimeout(() => {
          member.roles.remove(shame);
        }, 1.2E+6);
          return "lmao i can't stop laughing u got muted for 20mins";
      }
      

      if(result >= 71 && result <=100) {
          return 'I had your reward but <@393373395149914113> stole it';
      }

      if(result >= 101 && result <= 120) {
          return 'No reward!';
      }
      
    return 'No reward!';

  }

  //gacha embed message
  let gachaEmbed = new Discord.MessageEmbed()
      .setColor('#'+Math.floor(Math.random()*16777215).toString(16))
      .setTitle('Gacha')
      .setAuthor(message.author.username, message.author.avatarURL())
      .setDescription(pull());

  // if command loops

  if (command === "ping") {
    message.channel.send(`Pong! This message had a latency of ${Math.round(client.ws.ping)} ms.`)
  }

  if (command === "gacha") {
    message.channel.send(gachaEmbed);
  }

  if (command === "help") {
    const help = new Discord.MessageEmbed()
      .setColor("#010101")
      .setAuthor(message.author.username, message.author.avatarURL())
      .setTitle('List of commands: ')
      .setDescription("Prefix: >\n`>gacha`: Run this command in the <#853518789706514443> channel to get limited roles\n`>ping`: Check's bot ping");
    message.channel.send(help);
  }

  if (member.roles.cache.has('841246634267377675')) {
    if (command === "changelog") {
      const changelog = new Discord.MessageEmbed()
      .setColor("#010101")
      .setTitle('Changelog')
      .setDescription(
        "v1.0: Gacha function, ping function\nv1.1: Added temporary roles, additional roles to role pool and bugfixes"
        );
      message.channel.send(changelog);
    }

  }

});

client.login(process.env.BOT_TOKEN);