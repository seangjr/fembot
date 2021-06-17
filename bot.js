const Discord = require('discord.js');
const client = new Discord.Client();
var dataset = require('./dataset.json');
const mongo = require('./db/mongo');
const fs = require("fs");
const WOKCommands = require('wokcommands');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);

  client.commands.set(command.name, command);

}

client.on('ready', async () => {
	console.log(`Logged in as ${client.user.tag}!`);
  client.user.setPresence({
    status: 'online',
    activity: {
        name: ">help",
        type: "PLAYING"
    }
  });
  await mongo().then(mongoose => {
    try {
      console.log('Connected to mongoDB!');
    } finally {
      mongoose.connection.close();
    }
  })
});

const prefix = ">";

client.on("message", async function(message) {

  if (message.author.bot || !message.content.startsWith(prefix)) return;

  const commandBody = message.content.slice(prefix.length);
  const args = commandBody.split(' ');
  const commandName = args.shift().toLowerCase();
  const command = client.commands.get(commandName) || client.commands.find(command => command.aliases && command.aliases.includes(commandName));

  if(!command) return message.channel.send(new Discord.MessageEmbed()
        .setColor("#FF0000")
        .setAuthor(message.author.username, message.author.avatarURL())
        .setDescription(`No permission or \`${commandName}\` doesn't exist!`));

  //changelog
  const changelog = new Discord.MessageEmbed()
      .setColor("#010101")
      .setTitle('Changelog')
      .setDescription(dataset.CHANGELOG);

  try {
    command.execute(message, args);
  } catch (err) {

    message.channel.send(new Discord.MessageEmbed()
    .setColor("#FF0000")
    .setAuthor(message.author.username, message.author.avatarURL())
    .setDescription(`No permission or \`${commandName}\` doesn't exist!`))

  }

});


client.login(process.env.BOT_TOKEN);