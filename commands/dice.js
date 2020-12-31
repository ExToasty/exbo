const Discord = require('discord.js');
const { prefix, embedColor } = require('');

module.exports = {
	name: 'diceroll',
	description: 'Rolls a dice',
	usage: `${prefix}diceroll <positive integer>`,
	aliases: ['roll', 'rolldice', 'dice', 'die'],
	guildOnly: false,
	args: true,
	selfExecute: false,
	requireMention: false,
	wip: false,
	cooldown: 3,
	deleteMessage: true,
	permissions: ['SEND_MESSAGES'],
	category: 'fun',
	execute(message, args) {
		const sides = args[1] * 6;
		const roll = Math.floor(Math.random() * sides) + 1;
		const embed = new Discord.MessageEmbed()
			.setColor(embedColor)
			.setTitle('__Dice Roll Results__')
			.setDescription(`\`You landed on __**${roll}**__ \``);
		return message.channel.send(embed);

	},
};