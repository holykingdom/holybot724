const Discord = require('discord.js');


exports.run = function(client, message) {
const embed = new Discord.RichEmbed()
.setColor('RANDOM')
.setTitle('» Komut Grupları')
.setTimestamp()
.addField('» Eğlence Komutları', 'h!yaz  h!wasted  h!kaçcm  h!tersyaz')
.addField('» Moderatör Komutları', 'h!temizle  h!yasakla  h!reklamtaraması')
.addField('» Genel Komutlar', 'h!ailemiz')
.addField('» Teyit Komutları', 'h!erkek  h!kadın')
.setFooter('© 2020 Holy', client.user.avatarURL)
.setTimestamp()
.setThumbnail(client.user.avatarURL)
message.channel.send(embed)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'yardım',
  description: 'Tüm komutları gösterir.',
  usage: 'yardım'
};
