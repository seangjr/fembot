const economy = require('../economy');
const Discord = require('discord.js')
module.exports = {
    name: 'balance',
    aliases: ['bal'],
    description: 'shows user balance',
    async execute (message, args) {
        const target = message.mentions.users.first() || message.author;
        const targetID = target.id;

        const guildID = message.guild.id;
        const userID = target.id;

        const coins = await economy.getCoins(guildID, userID);

        message.channel.send(new Discord.MessageEmbed()
                .setColor("#FF0000")
                .setAuthor(message.author.username, message.author.avatarURL())
                .setDescription(`<@${userID}> has **${coins}** coins!`));
    }
}