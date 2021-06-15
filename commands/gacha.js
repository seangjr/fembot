var Chance = require('chance');
const Discord = require('discord.js');
const ms = require('ms');
//chance
var chance = new Chance();
var roll = function() {
    return chance.integer({ min: 1, max: 200 });
}

module.exports = {
    name: 'gacha',
    description: "Gacha command",
    execute(message, args) {

        // roles
        const ganyuGrace = message.guild.roles.cache.find(r => r.id === "853529776307961856");
        const lovedByGod = message.guild.roles.cache.find(r => r.id === "853539423542968350");
        const gingerFav = message.guild.roles.cache.find(r => r.id === "853543265486897162");
        const simpRole = message.guild.roles.cache.find(r => r.id === "842010444478939146");
        const shame = message.guild.roles.cache.find(r => r.id === "841893441059553320");
        const rickrole = message.guild.roles.cache.find(r => r.id === "853588881441423371");
        const gachaAddict = message.guild.roles.cache.find(r => r.id === "853608039214612511");


        //member rolling function
        var member = message.member;

        //rick rolled link
        var rickroleMessage = new Discord.MessageEmbed()
            .setColor('#010101')
            .setTitle('Secret Gacha Prize')
            .setAuthor('Femboy Fox Bot', 'https://i.ibb.co/cCcBJKR/9265f52d2767dc5ebd15fc47ac980692.jpg')
            .addField("You won a secret gacha prize! Keep it secret at all costs.", "[Click here](https://www.youtube.com/watch?v=O91DT1pR1ew) to view the prize.")

        /**
         * gacha roles function
         * - has chance function
         */
        var pull = function() {

            var result = roll();

            //ganyu's grace
            if(result === 1 ) {
                member.roles.add(ganyuGrace);
                return `congrats <@${message.author.id}>! you just got the rarest <@&853529776307961856>!`;
            }
            //loved by GOD
            else if(result >= 2 && result <= 4) {
                member.roles.add(lovedByGod);
                return `nice <@${message.author.id}> you're loved by GOD!`;
            }
            //gacha addict
            else if (result >= 5 && result <= 7) {
                member.roles.add(gachaAddict);
                return 'why are you so addicted to this?! <@&853608039214612511> given. noice.';
            }
            //ginger fav
            else if(result >= 8 && result <= 10) {
                member.roles.add(gingerFav);
                return "you're officially <@306794812282109953>'s favourite! :sparkles: :sparkles:";
            }
            //simp
            else if(result >= 10 && result <= 15) {
                if (member.roles.cache.has('842010444478939146')) {
                    return 'lol simp! you got the simp role lmao haha';
                } else {
                    member.roles.add(simpRole);
                    setTimeout(() => {
                    member.roles.remove(simpRole);
                    }, ms('2 days'));
                    return 'lol simp! you got the simp role lmao haha';
                }
            }
            
            else if(result >= 16 && result <= 20) {
                return 'you almost got lucky <3 sadge';
            }

            //rick role
            else if(result >= 21 && result <= 40) {
                if (member.roles.cache.has('853588881441423371')) {
                    return "No reward!";
                } else {
                    member.roles.add(rickrole);
                    setTimeout(() => {
                    member.roles.remove(rickrole);
                    }, ms('2 days'));
                    message.author.send(rickroleMessage);
                    return `No reward!`;
                }
            }
                    
            //mute
            else if(result >= 41 && result <= 70) {
                if (member.roles.cache.has('841893441059553320')) {
                    return "lmao i can't stop laughing u got muted for 20mins";
                } else {
                    member.roles.add(shame);
                    setTimeout(() => {
                    member.roles.remove(shame);
                    }, ms('20m'));
                    return "lmao i can't stop laughing u got muted for 20mins";
                }
            }
            
            else if(result >= 71 && result <=100) {
                return 'I had your reward but <@393373395149914113> stole it';
            }

            else if(result >= 101 && result <= 120) {
                return 'No reward!';
            }
            
            return 'No reward!';

        }

        //gacha embed message
        var gachaEmbed = new Discord.MessageEmbed()
            .setColor('#'+Math.floor(Math.random()*16777215).toString(16))
            .setTitle('Gacha')
            .setAuthor(message.author.username, message.author.avatarURL())
            .setDescription(pull());

        message.channel.send(gachaEmbed);
    
    }

}