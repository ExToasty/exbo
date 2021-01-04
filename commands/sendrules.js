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
		const welcome = new Discord.MessageEmbed()
			.setColor(embedColor)
			.setTitle('__Welcome to ExIn__')
			.setDescription('`Welcome to ExIn. Official server for all of ExquisiteToast#3620\'s current projects and the projects to come.\n\
Just a quick little reminder to follow Discord\'s ToS at all times and just use your common sense.`');
		const rules = new Discord.MessageEmbed()
			.setColor(embedColor)
			.setTitle('__Rules__')
			.addFields(
				{ name: '__Rule 1__', value: '`Be respectful to everyone. We don\'t need any toxicity in this server.`' },
				{ name: '__Rule 2__', value: '`Any type of slurs against race or sexuality, are not tolerable.`' },
				{ name: '__Rule 3__', value: '`Use channels for their respective purpose.`' },
				{ name: '__Rule 4__', value: '`Do NOT user a member\'s real name, unless given EXPLICIT permission from the member`' },
				{ name: '__Rule 5__', value: '`No NSFW permitted, keep your horniness out of this server.`' },
			);
		const extraInfo = new Discord.MessageEmbed()
			.setColor(embedColor)
			.setTitle('__Extra Information__')
			.addFields(
				{ name: '__Invite Links__', value: '`The only REAL invites to this server and for the bot are in the embed below.`', inline: true },
				{ name: '__Punishments__', value: '`You do not have to break the rules to be punished.`', inline: true },
			);
		const invites = new Discord.MessageEmbed()
			.setColor(embedColor)
			.setTitle('__Invite Links__')
			.addFields(
				{ name: '__Discord Server__', value: 'http://gg.gg/exininvite', inline: true },
				{ name: '__Discord Bot__', value: 'http://gg.gg/exboinvite', inline: true },
			);

		try {
			await message.channel.send(welcome);
			await message.channel.send(rules);
			await message.channel.send(extraInfo);
			await message.channel.send(invites);
		}
		catch (err) {
			console.error(err);
		}
	},
};