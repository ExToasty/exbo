const Discord = require('discord.js');
const { prefix, embedColor } = require('../config.json');

module.exports = {
	name: 'help',
	description: 'Displays categories and commands, or specific \
information on a command.',
	usage: `\`${prefix}help [command]\``,
	aliases: ['list', 'commands', 'cmds' ],
	cooldown: 5,
	category: 'information',
	permissions: ['SEND_MESSAGES'],
	execute(message, args) {
		const { commands } = message.client;
		//  const amount = commands.size();

		const moderation = '`' + commands.filter(command => command.category === 'moderation')
			.map(m => m.name).join('`, `') + '`';
		const information = '`' + commands.filter(command => command.category === 'information')
			.map(i => i.name).join('`, `') + '`';
		const chat = '`' + commands.filter(command => command.category === 'chat')
			.map(c => c.name).join('`, `') + '`';
		const fun = '`' + commands.filter(command => command.category === 'fun')
			.map(f => f.name).join('`, `') + '`';

		//  const total = moderation.length() + information.length() + length() + fun.length();

		if (!args.length) {
			const embed = new Discord.MessageEmbed()
				.setColor(embedColor)
				.setTitle('__**Commands**__')
				.addFields(
					{ name: '__Moderation__', value: moderation, inline: true },
					{ name: '__Information__', value: information, inline: true },
					{ name: '\u200B', value: '\u200B' },
					{ name: '__Chat__', value: chat, inline: true },
					{ name: '__Fun__', value: fun, inline: true },
					//        { name: '__Total Command__', value: `\`${total}\``, inline: false }
				)
				.setFooter(`To get help for a specific command, run \`${prefix}help <command>\``);
			return message.channel.send(embed);
		}

		const name = args[0].toLowerCase();
		const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

		if (!command) {
			return message.reply('Invalid command or alias.');
		}

		const embed = new Discord.MessageEmbed()
			.setColor(embedColor)
			.setTitle(`__Help for \`${prefix}${name}\`__`)
			.addField('Description', `\`${command.description}\``);

		if (command.usage) embed.addField('Usage', `\`${command.usage}\``);

		if (command.aliases && command.aliases.length > 1) {
			embed.addField('Aliases', "`" + command.aliases.join('`, `') + '`');
		}

		if (command.aliases && command.aliases.length === 1) {
			embed.addField('Alias', `\`${command.aliases[0]}\``);
		}

		if (command.cooldown) {
			embed.addField('Cooldown', `\`${command.cooldown} second(s)\``);
		}

		message.channel.send(embed);
	},
};