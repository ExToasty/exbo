const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Uh, why are you here and how did you find this? Anyways, thats besides the point, have you joined our official Discord server? You haven\'t? Well thats no good! Here is the link: https://discord.gg/U6eePgu and we can\'t forget about the bot, now can we? Here is the invite link for the bot: https://discord.com/oauth2/authorize?client_id=759836239791915028&scope=bot&permissions=8 Enjoy your stay!'));

app.listen(port, () => console.log(`ExBo is listening at http://localhost:${port}`));

// Discord Bot Starts Now!

"use strict";

const fs = require('fs');
const Discord = require('discord.js');
const Sequelize = require('sequelize');
const { prefix, token, version, embedColor } = require('./config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

const cooldowns = new Discord.Collection();

const sequelize = new Sequelize('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sqlite',
});

const Tags = sequelize.define('tags', {
	name: {
		type: Sequelize.STRING,
		unique: true,
	},
	description: Sequelize.TEXT,
	username: Sequelize.STRING,
	usage_count: {
		type: Sequelize.INTEGER,
		defaultValue: 0,
		allowNull: false,
	},
});

const date = Date.now();
const time = new Date(date)

client.on('ready', () => {
	console.log(`Ready!`);
	Tags.sync();
	client.user.setActivity(`ExBo v${version}`, { type: 'PLAYING' });
});

client.on('guildCreate', guild => {
	console.log(`Added to the following server: ${guild.name}, which has ${guild.memberCount}`);
})

client.on('guildMemberAdd', member => {
	console.log(`${member.name} has joined the server at ${time}`)
	let role = member.guild.roles.cache.find(x => x.name === 'ExInUs');
	member.roles.add(role);
});

client.on('message', message => {
	let embed = new Discord.MessageEmbed()
		.setColor(embedColor)

	if (message.content.toLowerCase() === 'thx') {
		message.channel.send('ur welcome bb')
	}

	if (message.author.id === '632690114082111519') return message.channel.send('no');

	if (!message.content.startsWith(prefix) || message.author.bot) return;
	if (!message.channel.id === '759841418499194941') return message.channel.send(`Commands \
  are only allowed in <#759841418499194941>`);

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) {
		embed
			.setTitle('__Command or Alias Not Found__')
			.setDescription(`\`Check if there is a spelling error and retry the command.\``)
			.setFooter('Run `>help` if you want to get a list of commands.')

		return message.channel.send(embed) && console.error();
	}

	if (command.guildOnly && message.channel.type === 'dm') {
		return message.reply('That command is not executable in DMs');
	}

	if (message.author.id != '332555969169063938' && command.permissions && !message.member.hasPermission(command.permissions)) {
		embed
			.setTitle('__Insufficient Permissions__')
			.setDescription(`\`You don't have the permissions to run this command\``)

		return message.channel.send(embed);
	}

	if (command.args && !args.length) {
		embed
			.setTitle('__Missing Arguments__')
			.setDescription('\`Arguments are required for this command to function.\`')

		if (command.usage) embed.addField('__Usage__', `\`${command.usage}\``)

		return message.channel.send(embed);
	}

	if (!cooldowns.has(command.name)) cooldowns.set(command.name, new Discord.Collection());

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (message.member.hasPermission('MANAGE_MESSAGES')) {
			try {
				command.execute(message, args);
			} catch (error) {
				console.error(error);
				message.channel.send();
			}
			return;
		}

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(`You still have ${timeLeft.toFixed(1)} second(s) left until \
the cooldown expires`);
		}
	}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	if (command.selfExecute) {
		if (command.selfExecute === false) {
			embed.setDescription('You can\'t run this command on yourself');

			return message.channel.send(embed);
		}
	}

	if (command.requireMention && !message.mentions.users.size > 0) {
		embed
			.setColor(embedColor)
			.setTitle('__Invalid Arguement__')
			.setDescription('You need to mention a user.')


		if (command.usage) embed.addField('__Usage__', `\`${command.usage}\``);
		return message.channel.send(embed);
	}

	if (command.wip && command.wip === true) {
		embed
			.setTitle('Command Unavailable')
			.setDescription('\`This command isn\'t functional at the moment, please be patient.\`')
	}

	try {
		if (command.deleteMessage && command.deleteMessage === true) {
			message.delete({ timeout: 1000 });
		}

		embed
			.setTitle('__Error Executing Command__')
			.setDescription(`An error has caused the command to fail execution. We will look\
into this momentarily`)

		command.execute(message, args);

		console.log(`${message.member.user.tag} has executed '${prefix}${command.name}' \
with the following arguments: '${args.join(' ')}' at ${time} in ${message.guild.name}`);
	} catch (error) {
		embed
			.setTitle('__Error Executing Command__')
			.setDescription(`\`An error has caused the command to fail execution. We will look into \
this momentarily\``)

		console.error(error);
		embed.addFields(
			{ name: '__Error Message__', value: `\`${error}\`` },
			{
				name: '__Troubleshooting__', value: '\`Try reloading the command. \
If that doesn\'t work, report the issue in <!#759847171930849282>\`' }
		)

		message.channel.send(embed);
	}
});

client.login(process.env.DISCORD_TOKEN);