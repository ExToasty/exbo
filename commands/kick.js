const Discord = require('discord.js');
const { prefix, embedColor } = require('../config.json');

module.exports = {
	name: 'kick',
	description: 'Kicks the specified user',
	usage: `${prefix}kick <member> [reason]`,
	// aliases: [''],
	guildOnly: true,
	args: true,
	selfExecite: false,
	requireMention: true,
	wip: false,
	cooldown: 5,
	deleteMessage: true,
	permissions: ['KICK_MEMBERS'],
	category: 'moderation',
	execute(message, args) {
		const embed = new Discord.MessageEmbed()
			.setColor(embedColor)
			.setTitle('Member Succesfully Kicked');
		const member = message.mentions.members.first();
		const reason = args.slice(1).join(' ');

		if (!args.slice(1).length) {
			embed.setDescription(`${member.tag} has been kicked`);
			return member.kick().then(message.channel.send(embed));
		}
		embed.setDescription(`${member.tag} member has been kicked for ${reason}`);
		return member.kick([reason]).then(message.channel.send(embed));
	},
};