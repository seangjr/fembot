const Discord = require('discord.js');
var Chance = require('chance');
const client = new Discord.Client();

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
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
  let bakaMitai = message.guild.roles.cache.find(r => r.id === "853543265486897162");
  let simpRole = message.guild.roles.cache.find(r => r.id === "842010444478939146");


  //member rolling function
  let member = message.member;


  /**
   * gacha roles function
   * 
   */
  var chance = new Chance();
  var roll = function() {
      return chance.integer({ min: 1, max: 100 })
  }

  var pull = function() {

      var result = roll();

      if(result == 1 ) {
        member.roles.add(ganyuGrace);
          return `Congrats <@${message.author.id}>! You just got the rarest <@&853529776307961856>!`;
      }

      if(result >= 2 && result <= 4) {
        member.roles.add(lovedByGod);
          return `Nice <@${message.author.id}> you just got the <@&853539423542968350> role`;
      }

      if(result >= 5 && result <= 10) {
        member.roles.add(bakaMitai);
          return 'You got the <@&853543265486897162> role!';
      }

      if(result >= 10 && result <= 15) {
        member.roles.add(simpRole);
        setTimeout(() => {
          member.roles.remove(simpRole);
        }, 1.728E+8);
          return 'lol simp! you got the simp role lmao';
      }

      if(result >= 16 && result <= 20) {
        return 'you almost got lucky <3 sadge';
      }

      if(result >= 21 && result <= 40) {
          return 'I had your reward but <@393373395149914113> stole it';
      }

      if(result >= 41 && result <=48) {
          return 'No reward!';
      }

      if(result >= 49 && result <= 60) {
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



});

client.login(process.env.BOT_TOKEN);