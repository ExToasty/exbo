const Discord = require('discord.js');
const { prefix, embedColor } = require('../config.json');

module.exports = {
	name: 'kill',
	description: 'Kills the bot',
	usage: `${prefix}restart`,
	aliases: ['end', 'exit', 'destroy'],
	guildOnly: false,
	minArgs: 0,
	selfExecute: false,
	requireMention: false,
	wip: false,
	cooldown: 10,
	permissions: 'SEND_MESSAGES',
	category: 'moderation',
	async execute(message) {
		message.delete({ timeout: 1000 }).catch(console.error);
		const embed = new Discord.MessageEmbed()
			.setColor(embedColor);

		if (message.author.id === '332555969169063938') {
			embed
				.setTitle('Kill Succesful__')
				.setDescription(`The bot has been killed.`);

			await message.channel.send(embed).catch(console.error);
			return process.exit();
		}
		else {
			message.channel.send('u cant use this command loser').catch(console.error);
		}
	},
};