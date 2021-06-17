const dataset = require('../dataset.json');
const Discord = require('discord.js');

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = mm + '/' + dd + '/' + yyyy;

module.exports = {
    name: 'homework',
    aliases: ['hw'],
    description: 'sends homework for today!',
    execute(message, args) {
        message.channel.send(new Discord.MessageEmbed()
                .setColor("#010101")
                .setAuthor(message.author.username, message.author.avatarURL())
                .addField(`Homework(s) due as of ${today}`, dataset.HOMEWORK));
    }
}