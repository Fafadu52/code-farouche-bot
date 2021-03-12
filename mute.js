//mute


//merci a https://github.com/AlexAnimateMP4 pour l'aide a faire cette comande 
//pour utiliser cette comande il faut enlever les permission de everyone et ajouter un role membre aux perssone de votre server(sinon la comande ne pourra pas etre utiliser car les permission de everyone seront active)
const Discord = require('discord.js');
const client = new Discord.Client();

client.login('TOKEN');
const prefix = `+`;
 
client.on(`message`, async (message) => {
    if (message.author.bot) return;
    if (message.content.indexOf(prefix) !== 0) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    if (command === "mute") {
        let target = message.guild.member(message.mentions.users.first());
        let muteRole = message.guild.roles.find(x => x.name === "Muté");
 
        if (!muteRole) {
            try {
                muteRole = await message.guild.roles.create({
                    data: {
                        name: "Muté",
                        color: "#514f48",
                        hoist: true,
                        permissions: []
                    }
                });
                message.guild.channels.forEach(async (channel, id) => {
                    await channel.overwritePermissions(muteRole, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false,
                        SEND_TTS_MESSAGES: false,
                        ATTACH_FILES: false,
                        SPEAK: false
                    });
                });
            } catch (error) {
                return console.error(error);
            };
        };
 
        if (!target) return message.reply(`S\'il vous plait mentionné un membre valide !`);
 
        if (!target.roles.has(muteRole.id)) {
            message.reply(`${target} est muté !`);
            return target.addRole(muteRole);
        } else return message.channel.send(`${target} est déjà mute !`);
    };
});
