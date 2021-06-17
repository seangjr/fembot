const Discord = require('discord.js');
const economy = require('../economy');

module.exports = {
    name: 'addbalance',
    aliases: ['addbal'],
    description: 'adding balance',
    minArgs: 2,
    maxArgs: 2,
    expectedArgs: "<The target's @> <coin amount>",
    permissionError: new Discord.MessageEmbed().setColor("#FF0000").setTitle('No permissions!').setDescription('You must have administrator to perform this command!'),
    permissions: 'ADMINISTRATOR',
    async execute (message, args) {
        const mention = message.mentions.users.first();

        if (!mention) {
            message.reply(new Discord.MessageEmbed().setColor("#FF0000").setAuthor(message.author.username, message.author.avatarURL()).setDescription('**Please specify user to add coins to**'))
            return
        }

        const coins = args[1];
        if (isNaN(coins)) {
            message.reply(new Discord.MessageEmbed().setColor("#FF0000").setAuthor(message.author.username, message.author.avatarURL()).setDescription('**Please provide a valid amount of coins**'))
            return
        }

        const guildID = message.guild.id;
        const userID = mention.id

        const newCoins = await economy.addCoins(guildID, userID, coins);

        message.reply(new Discord.MessageEmbed().setColor("#00FF00").setAuthor(message.author.username, message.author.avatarURL()).setTitle("Success!").setDescription(`You have given **<@${userID}>** \`${coins}\` coin(s). They now have \`${newCoins}\` coin(s).`))
    }
}