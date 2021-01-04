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
	async execute(message, args) {
		try {
			const id = args[0];
			const bans = await message.guild.fetchBans();
			const user = bans.find(findUser => findUser.id === id);
			const reason = args.slice(1).join(' ');
			const embed = new Discord.MessageEmbed()
				.setColor(embedColor)
				.setTitle('__Succesfully Unbanned User__');

			if (!id) {
				embed
					.setTitle('__Ban Unsuccesful__')
					.setDescription('`The user provided isn\'t banned or doesn\'t exist.`');

				return message.channel.send(embed);
			}

			if (!reason) {
				embed.setDescription(`__**\`${user}\`**__\` has been unbanned\``);

				await message.guild.members.unban(user);
				return message.channel.send(embed);
			}
			embed.setDescription(`__**\`${user}\`**__\` has been unbanned for ${reason}\``);

			await message.guild.members.unban(user, [reason]);
			return message.channel.send(embed);
		}
		catch (err) {
			console.error(err);
		}
	},
};
