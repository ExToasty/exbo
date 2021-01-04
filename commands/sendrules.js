const Discord = require('discord.js');
const { prefix, embedColor } = require('../config.json');

module.exports = {
	name: 'sendrules',
	description: 'Sends the pre-configured rule embeds in the channel the command was executed in.',
	usage: `${prefix}sendrules`,
	aliases: ['rules'],
	guildOnly: true,
	args: false,
	selfExecute: false,
	requireMention: false,
	wip: false,
	cooldown: 5,
	deleteMessage: true,
	permissions: ['ADMINISTRATOR'],
	// category: 'moderation,
	async execute(message) {
		const rules = new Discord.MessageEmbed()
			.setColor(embedColor)
			.setTitle('__Rules__')
			.addFields(
				{ name: '__Rule 1__', value: '`Be respetful to everyone.`', inline: true },
				{ name: '__Rule 2__', value: '`Toxcitity is not tolerated, ESPECIALLY not towards the staff members.`', inline: true },
				{ name: '\u200B', value: '\u200B' },
				{ name: '__Rule 3__', value: '`Any type of slurs against race or sexuality, are not tolerable.`', inline: true },
				{ name: '__Rule 4__', value: '`Use channels for their respective purpose.`', inline: true },
				{ name: '\u200B', value: '\u200B', inline: true },
				{ name: '\u200B', value: '\u200B', inline: true },
				{ name: '__Rule 5__', value: 'Do NOT user a member\'s real name, unless given EXPLICIT permission from the member' },
			)
			.setTimestamp();
		const extraInfo = new Discord.MessageEmbed()
			.setColor(embedColor)
			.setTitle('__Extra Information__')
			.addFields(
				{ name: '__Invite Links__', value: '`The only REAL invites to this server and for the bot are in the embed below.`', inline: true },
				{ name: '__Punishments__', value: '`You do not have to break the rules to be punished, use your common sense and you\'ll be fine.`', inline: true },
			)
			.setTimestamp();
		const invites = new Discord.MessageEmbed()
			.setColor(embedColor)
			.setTitle('__Invite Links__')
			.addFields(
				{ name: '__Discord Server__', value: 'https://discord.gg/U6eePgu', inline: true },
				{ name: '__Discord Bot__', value: 'https://discord.com/oauth2/authorize?client_id=759836239791915028&scope=bot&permissions=8', inline: true },
			)
			.setTimestamp();

		try {
			await message.channel.send(rules);
			await message.channel.send(extraInfo);
			await message.channel.send(invites);
		}
		catch (err) {
			console.error(err);
		}
	},
};