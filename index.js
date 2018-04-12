const Discord = require("discord.js");

var bot = new Discord.Client();
var prefix = "*";

bot.on('guildMemberAdd', function (member) {
    member.createDM().then(function (channel) {
        return channel.send('`Bienvenue Sur Menta PvP` ' + member.displayName)
    }).catch(console.error)
})

bot.on('guildMemberAdd', function (message) {
    message.member.addRole('434043344104980496')
    }).catch(console.error)
})

bot.on('message', message => {
    let command = message.content.split(" ")[0];
    const args = message.content.slice(prefix.length).split(/ +/);
    command + args.shift().toLowerCase();

    if (command === prefix + "kick") {
        let modRole = message.guild.roles.find("name", "permkick");
        if(!message.member.roles.has(modRole.id)) {
            return message.reply("Erreur: Tu n'as pas la permission!").catch(console.error)
        }
        if(message.mentions.users.size === 0) {
            return message.reply("Erreur: Merci de mentionner l'utilisateur à expulser").catch(console.error)
        }
        let kickMember = message.guild.member(message.mentions.users.first());
        if(!kickMember) {
            return message.reply("Erreur: Cet utilisateur est introuvable ou impossible à expulser!")
        }
        if (!message.guild.member(bot.user).hasPermission("KICK_MEMBERS")) {
            return message.reply("Erreur: Je n'ai pas la permission KICK_MEMBERS pour faire cela.").catch(console.error)
        }
        kickMember.kick().then(member => {
            message.reply(`${member.user.username} a été expulsé !`).catch(console.error)
            message.guild.channels.find("name", "logs_discord").send(`**${member.user.username} a été expulsé du discord par **${message.author.username}`)
        }).catch(console.error)

    }
    
    if (command === prefix + "ban") {
        let modRole = message.guild.roles.find("name", "permban")
        if(!message.member.roles.has(modRole.id)) {
            return  message.reply("Erreur: Tu n'as pas la permission").catch(console.error)
        }
        const member = message.mentions.members.first();
        if (member) return message.reply("Erreur: Merci de mentionner l'utilisateur à bannir !");
        member.ban().then(member => {
            message.reply(`${member.user.username} a été banni avec succès!`).catch(console.error)
            message.guild.channels.find("name", "logs_discord").send(`**${member.user.username}** a été banni du discord par **${message.author.username}**`)
        }).catch(console.error)
}})

bot.on("message", function (message) {
    if (message.content === prefix + "help") {
        var embed = new Discord.RichEmbed()
            .setTitle("Liste des Commandes")
            .setDescription("Liste des commandes du BOT")
            .addField("- *help","**Page d'aide**", true)
            .addField("- *kick @Joueur", "**Expulsez Un Joueur**", true)
            .addField("- *ban @Joueur", "**Bannir Un Joueur**", true)
            .setColor("0x009127")
            .setFooter("©Menta PvP - 2018 Tout droits réservés")
        message.channel.sendEmbed(embed);
    }  

})

bot.on("ready", function() {
    bot.user.setActivity("MentaBot : Tapez /help");
    console.log("MentaBot Succes Connected to Menta PvP")
})

bot.login(process.env.TOKENN)
