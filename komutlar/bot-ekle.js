const Discord = require('discord.js');
const db = require('quick.db')
const gen = require('generate-password')
const moment = require('moment')
moment.locale('tr')

exports.run = async (client, message, args) => {
message.delete({timeout:5000})

let botnum = db.fetch(`botsayısı.${message.author.id}`)
var şifre = gen.generate({
        length: 6,
        numbers: true,
    })
 
if(message.channel.id !== "810218294027223102") return message.channel.send("Bu komutu sadece <#810218294027223102> kanalında kullanabilirsin").then((msg) => {
msg.delete({timeout:5000})})
const botid = args[0]
const prefix = args[1]
const dbdurum = args[2]
if(!botid) return message.author.send(new Discord.MessageEmbed().setDescription(`Bot IDsini Girmedin!`))
if(isNaN(botid)) return message.author.send(new Discord.MessageEmbed().setDescription(`Bot ID si Sadece Sayı Olarak Kabul Edilir!`))
if(!prefix) return message.author.send(new Discord.MessageEmbed().setDescription(`Prefix Girmedin!`))
if(dbdurum !== "evet" && dbdurum !== "hayır" && dbdurum !== "Evet" && dbdurum !== "Hayır") return message.author.send(new Discord.MessageEmbed().setDescription(`Dbl Durum Girmedin! "evet" / "hayır"`))
if(botnum > 6) return message.author.send(`Sunucumuza Sadece **7** Botunuzu Ekletebilirsiniz ve Siz Bu Sınırı Geçmişsiniz!`)
 db.add(`nu.${message.guild.id}`, +1)
let buanakadar = db.fetch(`nu.${message.guild.id}`)
 let asm = db.fetch(`nu.${message.guild.id}`)
db.set(`Bilgi.${şifre}`, { isim: botid, durum: "Beklemede", sahip: message.author.tag })




client.channels.cache.get("810218318287208536").send(` <:botscity12:810220931460235275> <@${message.author.id}> Adlı Kullanıcının <@${botid}> Adlı Botu Eklendi!!`)
let embed = new Discord.MessageEmbed()
.setAuthor(`Yeni Bot Onay İsteği!`)
.setDescription(`
**Bot ID:** \n \` ${botid} \`
**Sahip:** \n \` ${message.author.tag} \`
**Davet:**  [[Perm8]](https://discord.com/oauth2/authorize?client_id=${botid}&scope=bot&permissions=8) **/** [[Perm0]](https://discord.com/oauth2/authorize?client_id=${botid}&scope=bot&permissions=0)
**Bot** \n <@${botid}> 
**Prefix** \n \` ${prefix} \`
**Dbl Durum** \n \` ${dbdurum} \`
**Sahip Id** \n \` ${message.author.id} \` 
`)
.setColor("YELLOW")

client.channels.cache.get("810215539074269215").send(embed)
//
db.add(`botsayısı.${message.author.id}`, +1)
let embeda = new Discord.MessageEmbed()
.setAuthor(`${message.author.username} - Bot Ekledi!`)
.setColor("YELLOW")
.setDescription(`
**Bot ID:** \` ${botid} \`

**Sahip:** \` ${message.author.tag} \`
**Durum:** \` Beklemede: \`
**Bot** <@${botid}> 
**Sunucudaki Toplam Bot Ekleme Sayısı** \` ${asm} \` `)

client.channels.cache.get("810218318287208536").send(embeda)





}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['bot-ekle','addbot'],
    permLevel: 0
}
exports.help = {
    name: 'botekle',
};