const Discord = require('discord.js');
const { prefix, embedColor } = require('../config.json');

module.exports = {
	name: 'lock',
	description: 'Only lets people with Moderator permissions or above talk in the channel.',
	usage: `${prefix}lock`,
	aliases: ['channellock', 'close'],
	guildOnly: true,
	minArgs: 0,
	selfExecute: false,
	requireMention: false,
	wip: false,
	cooldown: 3,
	permissions: ['MANAGE_CHANNELS'],
	category: 'moderation',
	execute(message) {
		message.delete({ timeout: 1000 }).catch(console.error);
		const embed = new Discord.MessageEmbed()
			.setColor(embedColor)
			.setTitle('__Channel Is Now Locked__')
			.setDescription('`Only moderators and above can talk here now. Please do not carry the converstation over to another channel, doing so may lead to a warning or a mute.`');

		return message.channel.updateOverwrite(message.channel.guild.roles.everyone, { SEND_MESSAGES: false })
			.then(message.channel.send(embed))
			.catch();
	},
};