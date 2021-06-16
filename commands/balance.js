const Discord = require('discord.js');

module.exports = {
    name: "balance",
    aliases: ["bal", "bl"],
    permissions: [],
    description: "Checks the user balance",
    execute(message, args, cmd, client, discord, profileData) {
        message.channel.send(new Discord.MessageEmbed()
                    .setColor("#00FF00")
                    .setAuthor(message.author.username, message.author.avatarURL())
                    .setDescription(`Your **wallet** balance is ${profileData.coins} and your **bank** balance is ${profileData.bank}`));
    }
}