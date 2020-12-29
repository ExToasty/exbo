const Discord = require('discord.js');
const { prefix, embedColor } = require('discord.js');

module.exports = {
	name: '8ball',
	description: 'Replies with a random response to the question you have',
	usage: `${prefix}8ball <question>`,
	aliases: false,
	guildOnly: false,
	args: true,
	selfExecute: false,
	requireMention: false,
	wip: false,
	cooldown: 3,
	permissions: ['SEND_MESSAGES'],
	category: 'fun',
	execute(message, args) {
		const responses = [
			'It is certain.',
			'It is decidedly so.',
			'Without a doubt',
			'Yes = Definitely.',
			'You may rely on it.',
			'As I see it, yes',
			'Most likely.',
			'Outlook good',
			'Yes.',
			'Signs point to yes',
			'Reply hazy, try again.',
			'Ask again later.',
			'Better not tell you now.',
			'Cannot predict now',
			'Concentrate and ask again.',
			'Don\'t count on it',
			'My reply is no.',
			'My source code says no',
			'Outlook not so good',
			'Very doubtful'
		]

		const response = responses[Math.floor(Math.random() * responses.length)];

		message.channel.send(response)
	},
}