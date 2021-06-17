const Discord = require('discord.js');
const economy = require('../economy');

module.exports = {
    name: 'pay',
    aliases: ['p'],
    description: 'Pay a user',
    minArgs: 2,
    maxArgs: 2,
    expectedArgs: "<Target user's @> <amount of coins>",
    async execute(message, args, text) {
        const { guild, member } = message

        const target = message.mentions.users.first()
        if (!target) {
            message.channel.send(new Discord.MessageEmbed()
                        .setColor("#FF0000")
                        .setAuthor(message.author.username, message.author.avatarURL())
                        .setDescription("Please specify someone to give coins to."))
            return
        }

        const coinsToGive = args[1];
        if (isNaN(coinsToGive)) {
            message.channel.send(new Discord.MessageEmbed()
                        .setColor("#FF0000")
                        .setAuthor(message.author.username, message.author.avatarURL())
                        .setDescription("Please provide a valid number of coins to give."))
            return
        }

        const coinsOwned = await economy.getCoins(guild.id, member.id)
        if (coinsOwned < coinsToGive) {
            message.channel.send(new Discord.MessageEmbed()
                        .setColor("#FF0000")
                        .setAuthor(message.author.username, message.author.avatarURL())
                        .setDescription(`You do not have \`${coinsToGive}\` amount of coins!`))
            return
        }

        const remainingCoins = await economy.addCoins(
            guild.id,
            member.id,
            coinsToGive * -1
        )
        const newBalance = await economy.addCoins(
            guild.id,
            target.id,
            coinsToGive
        )

        message.channel.send(new Discord.MessageEmbed()
                        .setColor("#00FF00")
                        .setTitle("Success!")
                        .setAuthor(message.author.username, message.author.avatarURL())
                        .setDescription(`You have given **<@${target.id}>** \`${coinsToGive}\` coins! They now have \`${newBalance}\` coins and you have \`${remainingCoins}\` coins.`))
    }
}