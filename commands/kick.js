const Discord = require('discord.js');
const { prefix, embedColor } = require('../config.json');

module.exports = {
	name: 'kick',
	description: 'Kicks the specified user',
	usage: `${prefix}kick <member> [reason]`,
	// aliases: [''],
	guildOnly: true,
	minArgs: 1,
	selfExecite: false,
	requireMention: true,
	wip: false,
	cooldown: 5,
	permissions: 'KICK_MEMBERS',
	category: 'moderation',
	async execute(message, args) {
		message.delete({ timeout: 1000 }).catch(console.error);
		const embed = new Discord.MessageEmbed()
			.setColor(embedColor)
			.setTitle('Member Succesfully Kicked');
		const member = args[0];
		const reason = args.slice(1).join(' ');

		if (!reason) {
			embed.setDescription(`${member.name} has been kicked`);
			return member.kick().then(message.channel.send(embed));
		}
		embed.setDescription(`${member.name} member has been kicked for ${reason}`);
		return member.kick([reason]).then(message.channel.send(embed));
	},
};