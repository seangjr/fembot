const Discord = require('discord.js');
const ms = require('ms');
const db = require('quick.db')


module.exports = {
    name: 'remindme',
    description: 'reminder system',
    execute(message, args) {

        let timeuser = args[0]
        let reason = args.slice(1).join(" ");

        if(!timeuser) return message.channel.send(new Discord.MessageEmbed()
                    .setColor("#FF0000")
                    .setDescription("**Invalid time argument!** Enter valid time"));
        if(!reason) return message.channel.send(new Discord.MessageEmbed()
                    .setColor("#FF0000")
                    .setDescription("**Invalid reason argument!** Enter valid reason"));

        let remindAuthorEmbed = new Discord.MessageEmbed()
        .setColor('#fc9cd8')
        .setAuthor('Femboy Fox Bot', 'https://i.ibb.co/cCcBJKR/9265f52d2767dc5ebd15fc47ac980692.jpg')
        .setThumbnail("https://media.discordapp.net/attachments/516435840130482216/687012987525136440/DynoTimer.png")
        .addField("Reminder", `${reason}`);

        let remindServerEmbed = new Discord.MessageEmbed()
        .setColor('#00ff00')
        .setAuthor('Femboy Fox Bot', 'https://i.ibb.co/cCcBJKR/9265f52d2767dc5ebd15fc47ac980692.jpg')
        .setThumbnail("https://media.discordapp.net/attachments/516435840130482216/687012987525136440/DynoTimer.png")
        .setTitle("Reminder")
        .setDescription(`Success! Reminding ${message.author.username} in ${timeuser}.\n\n${reason}`);

        db.set(`remind.${message.author.id}`,Date.now() + ms(timeuser));
        message.channel.send(remindServerEmbed)

        const interval = setInterval(() => {
            if(Date.now() > db.fetch(`remind.${message.author.id}`)) {
                db.delete(`remind.${message.author.id}`);
                message.author.send(remindAuthorEmbed);
                clearInterval(interval);
            }
        }, 1000);

    }
}