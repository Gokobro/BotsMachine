const Discord = require('discord.js');
const db = require('quick.db')
exports.run = async (client, message, args) => {

  if(!message.guild.members.cache.get(message.author.id).roles.cache.has("810221778861031506")) return message.channel.send(`YETKİLİ DEĞİLSİN!!`)


const kisi = args[0]
const botid = args[1]
const sebep = args.slice(2).join(" ")



if (!kisi) return message.channel.send(`Kişi İd Gir`)
if (!botid) return message.channel.send(`Bot İd Gir`)
if(!sebep) return message.channel.send(`Sebep Gir`)

client.channels.cache.get("810218318287208536").send(` <:red:810224193651867688> <@${kisi}> Adlı Kullanıcının <@${botid}> Adlı Botu Reddedildi!`)
let embed = new Discord.MessageEmbed()
.setAuthor(` Bot Reddedildi!`)
.setColor("RED")
.setDescription(`
**Bot ID:** \` ${botid} \`
**Sahip:** \` ${message.author.tag} \`
**Reddeden Yetkili:** ${message.author}  
**Bot** <@${botid}> 
**Sebep:** \` ${sebep} \``)
.setTimestamp()
.setFooter(`Bots Machine`)
client.channels.cache.get("810218318287208536").send(embed)


};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['reddet'],
    permLevel: 0
};

exports.help = {
    name: 'reddet',
    description: 'Say',
    usage: 'say'
};