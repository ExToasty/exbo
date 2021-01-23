/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const { prefix, embedColor } = require('../config.json');

module.exports = {
	name: 'inventory',
	description: 'Shows a users inventory',
	usage: `${prefix}inventory [member]`,
	aliases: ['inv', 'items'],
	requireMention: false,
	args: false,
	async execute(message, Users) {
		const embed = new Discord.MessageEmbed().setColor(embedColor);
		const target = message.mentions.users.first() || message.author;
		const user = await Users.findOne({ where: { user_id: target.id } });
		const items = await user.getItems();
		const inventory = items.map(i => `${i.amount} ${i.item.name}`).join(', ');

		if (!items.length) return message.channel.send(`${target.tag} has nothing!`);
		return message.channel.send(`${target.tag} currently has ${items.map(i => `${i.amount} ${i.item.name}`).join(', ')}`);
	},
};