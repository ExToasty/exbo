const { prefix, embedColor } = require('../config.json');
const Discord = require('discord.js');

module.exports = {
	name: 'unban',
	description: 'Unbans the user specuseried.',
	usage: `${prefix}unban <id> [reason]`,
	aliases: ['pardon'],
	guildOnly: false,
	args: true,
	selfExecute: false,
	requireMention: false,
	requireId: false,
	wip: false,
	cooldown: 5,
	permissions: ['ADMIN'],
	category: 'moderation',
	async execute(message, args, user) {
		const banList = await message.guild.fetchBans();
		const bannedUser = banList.find(findUser => findUser.id === 'id');
		const id = args[0];
		const reason = args.slice(1).join(' ');
		const embed = new Discord.MessageEmbed()
			.setColor(embedColor)
			.setTitle('__Succesfully Unbanned User__');
		try {
			if (!bannedUser) {
				embed
					.setTitle('__Ban Unsuccesful__')
					.setDescription('`The user provided isn\'t banned or doesn\'t exist.`');

				return message.channel.send(embed).catch();
			}

			if (!reason) {
				embed.setDescription(`__**\`${user}\`**__\` has been unbanned\``);

				return message.guild.members.unban(id)
					.then(message.channel.send(embed))
					.catch();
			}
			embed.setDescription(`__**\`${user}\`**__\` has been unbanned for ${reason}\``);

			return message.guild.members.unban(id, [reason])
				.then(message.channel.send(embed))
				.catch();
		}
		catch (err) {
			console.error(err);
		}
	},
};