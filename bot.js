const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment');
require('./util/eventLoader')(client);

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

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
    } catch (e){
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
    } catch (e){
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
    } catch (e){
      reject(e);
    }
  });
};

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'sa') {
    msg.reply('Aleyküm Selam Cnm Hoşgeldin Sunucumuza `:)`');
  }
  if (msg.content.toLowerCase() === 's.a') {
    msg.reply('Aleyküm Selam Cnm Hoşgeldin Sunucumuza `:)`');
  }
  if (msg.content.toLowerCase() === 's,a') {
    msg.reply('Aleyküm Selam Cnm Hoşgeldin Sunucumuza `:)`');
  }
  if (msg.content.toLowerCase() === 'selam') {
    msg.reply('Selam Cnm Hoşgeldin Sunucumuza `:)`');
  }
  if (msg.content.toLowerCase() === 'slm') {
    msg.reply('Selam Cnm Hoşgeldin Sunucumuza `:)`');
  }
  if (msg.content.toLowerCase() === 'merhaba') {
    msg.reply('Merhaba Cnm Hoşgeldin Sunucumuza `:)`');
  }
  if (msg.content.toLowerCase() === 'meraba') {
    msg.reply('Merhaba Cnm Hoşgeldin Sunucumuza `:)`');
  }
  if (msg.content.toLowerCase() === 'tag') {
    msg.reply('Tagımız: **ĦØŁƳ ♱** `:)`');
  }
});

client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(ayarlar.token);

client.on("userUpdate", async (oldUser, newUser) => {
  if (oldUser.username !== newUser.username) {
    let tag = "ĦØŁƳ ♱"; //tagınız
    let sunucu = "694150430262820915"; //sunucu ID
    let kanal = "694479346521604217" //log kanal id
    let rol = "694502743255154700"; // rol ID
    if (newUser.username.includes(tag) && !client.guilds.get(sunucu).members.get(newUser.id).roles.has(rol)) {
      client.channels.get(kanal).send(`${newUser} ${tag} tagını aldığı için <@&${rol}> rolünü kazandı!`)
      client.guilds.get(sunucu).members.get(newUser.id).addRole(rol)
    } if (!newUser.username.includes(tag) && client.guilds.get(sunucu).members.get(newUser.id).roles.has(rol)) {
      client.guilds.get(sunucu).members.get(newUser.id).removeRole(rol)
      client.channels.get(kanal).send(`${newUser} ${tag} tagını çıkardığı için <@&${rol}> rolünü kaybetti!`)
    }

  }
})


client.on("message", async  msg => {
 var i = await db.fetch(`küfür_${msg.guild.id}`)
    if (i == 'acik') {
       const küfür = ["sg","oç","oçe","anan","ananı","ananı sikim","anneni sikim","anneni sikeyim","ananı sikeyim","annen","ağzına","ağzına sıçim","ağzına sıçayım","ağzına s","am","ambiti","amını","amını s","amcık","amcik","amcığını","amciğini","amcığını","amcığını s","amck","amckskm","amcuk","amına","amına k","amınakoyim","amına s","amunu","amını","amın oğlu","amın o","amınoğlu","amk","aq","amnskm","anaskm","ananskm","amkafa","amk çocuğu","amk oç","piç","amk ç","amlar","amcıklar","amq","amındaki","amnskm","ananı","anan","ananın am","ananızın","aneni","aneni s","annen","anen","ananın dölü","sperm","döl","anasının am","anası orospu","orospu","orosp,","kahpe","kahbe","kahße","ayklarmalrmsikerim","ananı avradını","avrat","avradını","avradını s","babanı","babanı s","babanın amk","annenin amk","ananın amk","bacı","bacını s","babası pezevenk","pezevenk","pezeveng","kaşar","a.q","a.q.","bitch","çük","yarrak","am","cibiliyetini","bokbok","bombok","dallama","göt","götünü s","ebenin","ebeni","ecdadını","gavat","gavad","ebeni","ebe","fahişe","sürtük","fuck","gotten","götten","göt","gtveren","gttn","gtnde","gtn","hassiktir","hasiktir","hsktr","haysiyetsiz","ibne","ibine","ipne","kaltık","kancık","kevaşe","kevase","kodumun","orosbu","fucker","penis","pic","porno","sex","sikiş","s1kerim","s1k","puşt","sakso","sik","skcm","siktir","sktr","skecem","skeym","slaleni","sokam","sokuş","sokarım","sokarm","sokaym","şerefsiz","şrfsz","sürtük","taşak","taşşak","tasak","tipini s","yarram","yararmorospunun","yarramın başı","yarramınbaşı","yarraminbasi","yrrk","zikeyim","zikik","zkym"];
        if (küfür.some(word => msg.content.includes(word))) {
          try {
            if (!msg.member.hasPermission("BAN_MEMBERS")) {
                  msg.delete();
                    return msg.reply('Bu Sunucuda Küfür Engelleme Filtresi Aktiftir. Küfür Yapmana İzin Veremem **!**').then(msg => msg.delete(3000));

  msg.delete(3000);

            }
          } catch(err) {
            console.log(err);
          }
        }
    }
    else if (i == 'kapali') {

    }
    if (!i) return;
  })
  ;

  client.on("message", async  msg => {
   var mayfe = await db.fetch(`reklam_${msg.guild.id}`)
      if (mayfe == 'acik') {
          const birisireklammidedi = [".com", ".net", ".xyz", ".tk", ".pw", ".io", ".me", ".gg", "www.", "https", "http", ".gl", ".org", ".com.tr", ".biz", "net", ".rf.gd", ".az", ".party", "discord.gg",];
          if (birisireklammidedi.some(word => msg.content.includes(word))) {
            try {
              if (!msg.member.hasPermission("BAN_MEMBERS")) {
                    msg.delete();
                      return msg.reply('Bu Sunucuda Reklam Engelleme Filtresi Aktiftir. Reklam Yapmana İzin Veremem !').then(msg => msg.delete(3000));

    msg.delete(3000);

              }
            } catch(err) {
              console.log(err);
            }
          }
      }
      else if (mayfe == 'kapali') {

      }
      if (!mayfe) return;
    })
    ;


    client.on("messageUpdate", (old, nev) => {
      if (old.content != nev.content) {
        const yasak = [
          "discord.app",
          "discord.gg",
          "invite",
          "discordapp",
          "discordgg",
          ".com",
          ".net",
          ".xyz",
          ".tk",
          ".pw",
          ".io",
          ".me",
          ".gg",
          "www.",
          "https",
          "http",
          ".gl",
          ".org",
          ".com.tr",
          ".biz",
          ".party",
          ".rf.gd",
          ".az",
          "sg",
          "oç",
          "oçe",
          "anan",
          "ananı",
          "ananı sikim",
          "anneni sikim",
          "anneni sikeyim",
          "ananı sikeyim",
          "annen",
          "ağzına",
          "ağzına sıçim",
          "ağzına sıçayım",
          "ağzına s",
          "am",
          "ambiti",
          "amını",
          "amını s",
          "amcık",
          "amcik",
          "amcığını",
          "amciğini",
          "amcığını",
          "amcığını s",
          "amck",
          "amckskm",
          "amcuk",
          "amına",
          "amına k",
          "amınakoyim",
          "amına s",
          "amunu",
          "amını",
          "amın oğlu",
          "amın o",
          "amınoğlu",
          "amk",
          "aq",
          "amnskm",
          "anaskm",
          "ananskm",
          "amkafa",
          "amk çocuğu",
          "amk oç",
          "piç",
          "amk ç",
          "amlar",
          "amcıklar",
          "amq",
          "amındaki",
          "amnskm",
          "ananı",
          "anan",
          "ananın am",
          "ananızın",
          "aneni",
          "aneni s",
          "annen",
          "anen",
          "ananın dölü",
          "sperm",
          "döl",
          "anasının am",
          "anası orospu",
          "orospu",
          "orosp,",
          "kahpe",
          "kahbe",
          "kahße",
          "ayklarmalrmsikerim",
          "ananı avradını",
          "avrat",
          "avradını",
          "avradını s",
          "babanı",
          "babanı s",
          "babanın amk",
          "annenin amk",
          "ananın amk",
          "bacı",
          "bacını s",
          "babası pezevenk",
          "pezevenk",
          "pezeveng",
          "kaşar",
          "a.q",
          "a.q.",
          "bitch",
          "çük",
          "yarrak",
          "am",
          "cibiliyetini",
          "bokbok",
          "bombok",
          "dallama",
          "göt",
          "götünü s",
          "ebenin",
          "ebeni",
          "ecdadını",
          "gavat",
          "gavad",
          "ebeni",
          "ebe",
          "fahişe",
          "sürtük",
          "fuck",
          "gotten",
          "götten",
          "göt",
          "gtveren",
          "gttn",
          "gtnde",
          "gtn",
          "hassiktir",
          "hasiktir",
          "hsktr",
          "haysiyetsiz",
          "ibne",
          "ibine",
          "ipne",
          "kaltık",
          "kancık",
          "kevaşe",
          "kevase",
          "kodumun",
          "orosbu",
          "fucker",
          "penis",
          "pic",
          "porno",
          "sex",
          "sikiş",
          "s1kerim",
          "s1k",
          "puşt",
          "sakso",
          "sik",
          "skcm",
          "siktir",
          "sktr",
          "skecem",
          "skeym",
          "slaleni",
          "sokam",
          "sokuş",
          "sokarım",
          "sokarm",
          "sokaym",
          "şerefsiz",
          "şrfsz",
          "sürtük",
          "taşak",
          "taşşak",
          "tasak",
          "tipini s",
          "yarram",
          "yararmorospunun",
          "yarramın başı",
          "yarramınbaşı",
          "yarraminbasi",
          "yrrk",
          "zikeyim",
          "zikik",
          "zkym"
        ];
        if(yasak.some(banned => nev.content.includes(banned))) {
          if(!nev.member.hasPermission("MANAGE_MESSAGES")) {
            try {
              nev.delete();
              nev.channel.send(`<@${nev.author.id}>, bu sunucuda mesajını düzenleyerek küfür edemez veya reklam yapamazsın!`)
              nev.author.send(`<@${nev.author.id}>, **${nev.guild.name}** adlı sunucuda mesajını düzenleyerek küfür edemez veya reklam yapamazsın!`)
            } catch (err) {
              console.log(err)
            }
          }
        }
      }
    });
