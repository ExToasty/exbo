const Discord = require('discord.js');
const { prefix, embedColor } = require('../config.json');

module.exports = {
  name: 'purge',
  description: 'Deletes the specified amount of messages.',
  aliases: ['clear', 'delete'],
  usage: `${prefix}purge <positive integer>`,
  args: true,
  permissions: ['MANAGE_MESSAGES'],
  category: 'moderation',
  execute(message, args) {
    const deleteMessages = parseInt(args[0]) + 1;
    const embed = new Discord.MessageEmbed()
      .setColor('#0caecf')
      .setTitle('Invalid Value')
      .setDescription('You must choose an integer that is between 1 and 99')

    if (0 > args[0] || args[0] > 99) {
      return message.channel.send(embed);
    }
      return message.channel.bulkDelete(deleteMessages);
  },
}