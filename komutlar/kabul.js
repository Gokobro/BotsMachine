const Discord = require('discord.js');
const db = require('quick.db')
exports.run = async (client, message, args) => {

  if(!message.guild.members.cache.get(message.author.id).roles.cache.has("810221778861031506")) return message.channel.send(`YETKİLİ DEĞİLSİN!!`)


const botid = args[0]
const kisi = args[1]


if(!botid) return message.channel.send(`Bot İd Gir`)
if (!kisi) return message.channel.send(`Kişi İd Gir`)

client.channels.cache.get("810218318287208536").send(` <:onay:810223610098352138> <@${kisi}> Adlı Kullanıcının <@${botid}> Adlı Botu Onaylandı!!`)
let embed = new Discord.MessageEmbed()
.setAuthor(`Bot Onaylandı!`)
.setColor("GREEN")
.setDescription(`
**Bot ID:** \` ${botid} \`
**Sahip:**  <@${kisi}>
**Onaylayan Yetkili:** ${message.author}  
**Bot** <@${botid}> `)
.setTimestamp()
.setFooter(`Bots Machine`)
client.channels.cache.get("810218318287208536").send(embed)






};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['kabul'],
    permLevel: 0
};

exports.help = {
    name: 'kabul',
    description: 'Say',
    usage: 'say'
};