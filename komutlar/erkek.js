const Discord = require("discord.js");
const db = require('quick.db');
exports.run = (client, message, args) => {
  const kayıtlı = message.guild.roles.find(r => r.id === "694502786238251019"); //buraya erkek rolünüzün id'sini koyun
  const misafir = message.guild.roles.find(r => r.id === "694497413511118848"); //buraya misafir rolünüzün id'sini koyun.
  const log = message.guild.channels.find(c => c.id === "668456851427426322"); //buraya kayıt log id koyun
  const tag = "♱";
  if(!message.member.roles.array().filter(r => r.name === "♱ Teyit Görevlisi ♱")[0]) { //buraya kayıt sorumlusu rolünün tam ismini ctrl c ile girin
    return message.channel.send("Yeterli yetkiniz bulunmuyor.");
  } else {
    let member = message.mentions.users.first() || client.users.get(args.join(' '))
      if(!member) return message.channel.send("Bir kullanıcı girin.")
    const c = message.guild.member(member)
    const nick = args[1];
    const yas = args[2];
      if(!nick) return message.channel.send("Bir isim girin.")
      if(!yas) return message.channel.send("Bir yaş girin.")
    c.addRole(kayıtlı)
    c.removeRole(misafir)
    c.setNickname(`${tag} ${nick} ' ${yas}`)
    const embed = new Discord.RichEmbed()
    .setAuthor("Erkek kaydı yapıldı!")
    .addField(`Kaydı yapılan\n`, `${c.user.tag}`)
    .addField(`Kaydı yapan\n`, `${message.author.tag}`)
    .addField(`Yeni isim\n`, `${tag} ${nick} ' ${yas}`)
    .setFooter("-Holy | Teyit Sistemi")
    .setColor("BLUE")
    log.send(embed)
  }
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};
exports.help = {
  name: "erkek",
  description: "",
  usage: ""
};
