const Discord = require('discord.js');
const { prefix, embedColor } = require('../config.json');

module.exports = {
	name: 'diceroll',
	description: 'Rolls a dice',
	usage: `${prefix}diceroll <sides>`,
	aliases: ['roll', 'rolldice', 'dice', 'die'],
	guildOnly: false,
	minArgs: 1,
	selfExecute: false,
	requireMention: false,
	wip: false,
	cooldown: 3,
	deleteMessage: true,
	permissions: ['SEND_MESSAGES'],
	category: 'fun',
	execute(message, args) {
		let sides = parseInt(args[0], 10);
		const roll = Math.floor(Math.random() * sides) + 1;
		const embed = new Discord.MessageEmbed()
			.setColor(embedColor)
			.setTitle('__Dice Roll Results__')
			.setDescription(`\`You landed on \`__**\`${roll}\`**__\`.\``);

		if (!args.length) sides = 6;

		if (sides < 1) {
			embed
				.setTitle('Invalid Arguement')
				.setDescription('`You must provide an integer greater than 1`')
				.setFooter(`Run "${prefix}help diceroll" to get information about this command.`);

			return message.channel.send(embed);
		}

		return message.channel.send(embed);
	},
};