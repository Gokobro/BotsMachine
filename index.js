
const discord = require('discord.js');
const fs = require('fs');
const http = require('http');
const db = require('quick.db');
const moment = require('moment')
const express = require('express');
const ayarlar = require('./ayarlar.json');
const app = express();
app.get("/", (request, response) => {
response.sendStatus(200);
});
app.listen(process.env.PORT);


//READY.JS

const Discord = require('discord.js');
const client = new Discord.Client();
client.on('ready', async () => {
   client.appInfo = await client.fetchApplication();
  setInterval( async () => {
    client.appInfo = await client.fetchApplication();
  }, 600);
 
 client.user.setActivity(`Bots Machine - !botekle`, { type:'WATCHING' })
  
  console.log("Bots Machine | Aktifleştirildi")
});

const log = message => {
  console.log(` ${message}`);
};
require('./util/eventLoader.js')(client);

//READY.JS SON

//KOMUT ALGILAYICI

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
    if (err) console.error(err);
    log(`${files.length} komut yüklenecek.`);
    files.forEach(f => {
        let props = require(`./komutlar/${f}`);
        log(`Yüklenen komut: ${props.help.name}.`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
           reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};




client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

//KOMUT ALGILAYICI SON

client.elevation = message => {
    if (!message.guild) {
        return;
    }
    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;

    
};
client.login(ayarlar.token)


//-----------------------KOMUTLAR-----------------------\\
client.on("message", async message => {
if(message.channel.id !== "792813761323859968") return
message.delete({timeout: 500})
})



client.on("message", async message =>{
const d = require("wio.db")
if(d.fetch(`everHereEngelAçık_${message.guild.id}`)) {
if(message.content.includes("@everyone") || message.content.includes("@here")){
if(message.member.hasPermission("ADMINISTRATOR") || message.member.hasPermission("BAN_MEMBERS") || message.member.hasPermission("KICK_MEMBERS"))return message.channel.send({embed: {color: "BLACK", description: `Sunucuda everyone/here mesajını atmak yasak. Ama sende özel güçler vaar! Üzgünüm. Mesajımı 7 saniye içerisinde siliyorum :)` }}).then(msg => msg.delete({timeout: 7000}))
message.delete()
let seçenekler;
if(d.fetch(`everHereEngelSeçenek_${message.guild.id}`) === "ban" || d.fetch(`everHereEngelSeçenek_${message.guild.id}`) === "yasakla") seçenekler = "sunucudan yasaklanacaksın."
if(d.fetch(`everHereEngelSeçenek_${message.guild.id}`) === "kick" || d.fetch(`everHereEngelSeçenek_${message.guild.id}`) === "at") seçenekler = "sunucudan atılacaksın."
message.channel.send({embed: {color:"BLACK", description: "Bunu yapmayacaktın. 10 saniye içerisinde "+ seçenekler}}).then(msg => msg.delete({timeout: 10000}))
if(d.fetch(`everHereEngelSeçenek_${message.guild.id}`) === "ban" || d.fetch(`everHereEngelSeçenek_${message.guild.id}`) === "yasakla") {
setTimeout(async function() {
try{
await message.member.ban()
}catch(err){
console.log("Üyeyi banlayamadım.")
message.channel.send({embed: {color:"BLACK", description: "Üyeyi yasaklayamadım."}}).then(msg => msg.delete({timeout: 10000}))
}
}, 10000);
}
if(d.fetch(`everHereEngelSeçenek_${message.guild.id}`) === "kick" || d.fetch(`everHereEngelSeçenek_${message.guild.id}`) === "at") {
setTimeout(async function() {
try{
await message.member.kick()
}catch(err){
console.log("Üyeyi atamadım.")
message.channel.send({embed: {color:"BLACK", description: "Üyeyi atamadım."}}).then(msg => msg.delete({timeout: 10000}))
}
}, 10000);
}
}}
})