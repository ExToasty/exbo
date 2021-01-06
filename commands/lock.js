const Discord = require('discord.js');
const { prefix, embedColor } = require('../config.js');

module.exports = {
	name: 'lock',
	description: '',
	usage: `${prefix}lock`,
	aliases: ['channellock', 'close'],
	guildOnly: true,
	minArgs: 0,
	selfExecute: false,
	requireMention: false,
	wip: false,
	cooldown: 3,
	deleteMessage: true,
	permissions: ['MANAGE_CHANNELS'],
	category: 'moderation',
	execute(message) {
		const embed = new Discord.MessageEmbed()
			.setColor(embedColor)
			.setTitle('__Channel Is Now Locked__')
			.setDescription('`This channel is now locked, please do not carry the converstation over to another channel, doing so may lead to a warning or a mute.`');
		message.channel.updateOverwrite(message.channel.guild.roles.everyone, { SEND_MESSAGES: false })
			.then(message.channel.send(embed))
			.catch();
	},
};