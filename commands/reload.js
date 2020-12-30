"use strict";

const Discord = require("discord.js");
const { prefix, embedColor } = require('../config.json');


module.exports = {
	name: 'reload',
	description: 'Reloads the command specified',
	aliases: ['update', 'restart', 'refresh'],
	usage: `${prefix}reload <command>`,
	category: 'bot',
	cooldown: 10,
	args: true,
	deleteMessage: true,
	execute(message, args) {
		const commandName = args[0].toLowerCase();
		const command = message.client.commands.get(commandName)
      || message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
		const embed = new Discord.MessageEmbed().setColor(embedColor);

		if (!command) {
			embed
				.setTitle('__Command or Alias Not Found__')
				.setDescription(`\`Check if there is a spelling error and retry the command.\``)
				.setFooter('Run `>help` if you want to get a list of commands.');

			return message.channel.send(embed) && console.error();
		}

		delete require.cache[require.resolve(`./${command.name}.js`)];

		try {
			embed
				.setTitle('__Reload Succesful__')
				.setDescription(`\`The following command has been reloaded: "${command.name}"\``);
			const newCommand = require(`./${command.name}.js`);
			message.client.commands.set(newCommand.name, newCommand);
			message.channel.send(embed);
		}
		catch (error) {
			console.error(error);
			embed
				.setTitle('Reload Exception')
				.setDescription('`An unexpected error has caused the command to fail reloading. We are looking into it.`')
				.addFields(
					{ name: '__Troubleshooting__', value: '`Try reloading the command. If that doesn\'t work, report the issue in <!#759847171930849282>`' },
					{ name: '__Error Message__', value: `\`${error}\`` },
				);
		}
	},
};