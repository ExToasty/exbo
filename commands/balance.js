const Discord = require('discord.js');
const { prefix, embedColor } = require('../config.json');

module.exports = {
	name: 'balance',
	description: 'Returns your balance',
	usage: `${prefix}balance [user]`,
	aliases: ['money'],
	requireMention: false,
	execute(message, currency) {
		const target = message.mentions.users.first() || message.author;
		const embed = new Discord.MessageEmbed()
			.setColor(embedColor)
			.setTitle('__Bank Account__')
			.setDescription(`${target.tag}'s current balance is ${currency.getBalance(target.id)}💰`);

		message.channel.send(embed).catch(console.error);
	},
};