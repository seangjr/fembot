const dataset = require('../dataset.json');
const Discord = require('discord.js');

module.exports = {
    name: 'help',
    description: 'help command',
    execute(message, args) {
        message.channel.send(new Discord.MessageEmbed()
                    .setColor("#ff49ca")
                    .setAuthor(message.author.username, message.author.avatarURL())
                    .setTitle("Commands")
                    .setDescription(dataset.HELP_DESC));
    }
}