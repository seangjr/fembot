const Discord = require('discord.js');
const client = new Discord.Client();
var dataset = require('./dataset.json');
const fs = require('fs');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);

  client.commands.set(command.name, command);

}

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
  client.user.setPresence({
    status: 'online',
    activity: {
        name: ">help",
        type: "PLAYING"
    }
});
});

const prefix = ">";

client.on("message", function(message) {

  if (message.author.bot || !message.content.startsWith(prefix)) return;

  const commandBody = message.content.slice(prefix.length);
  const args = commandBody.split(' ');
  const command = args.shift().toLowerCase();

  var member = message.member;

  //changelog
  const changelog = new Discord.MessageEmbed()
      .setColor("#010101")
      .setTitle('Changelog')
      .setDescription(dataset.CHANGELOG);

  if (command === "gacha") {

    client.commands.get('gacha').execute(message, args);

  } else if (command == "ping") {

    client.commands.get('ping').execute(message, args);

  } else if (command == "homework") {

    client.commands.get('homework').execute(message, args);

  } else if (member.roles.cache.has('841246634267377675')) {
    if (command == "changelog") {
      message.channel.send(changelog);
    } else {
      message.channel.send(new Discord.MessageEmbed()
          .setColor("#FF0000")
          .setAuthor(message.author.username, message.author.avatarURL())
          .setDescription("No permission or command doesn't exist!"))
    }
  } else {
    message.channel.send(new Discord.MessageEmbed()
        .setColor("#FF0000")
        .setAuthor(message.author.username, message.author.avatarURL())
        .setDescription("No permission or command doesn't exist!"))
  }

});


client.login(process.env.BOT_TOKEN);