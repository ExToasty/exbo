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
    const amount = parseInt(args[0]) + 1;
    const embed = new Discord.MessageEmbed()
      .setColor('#0caecf')
      .setTitle('Invalid Value')
      .setDescription('You must choose an integer that is between 1 and 99')

    if (amount <= 1 || amount > 100) {
      return message.channel.send(embed);
    }
      return message.channel.bulkDelete(amount, true).catch(err => {
				console.error(err);
			})
  },
}