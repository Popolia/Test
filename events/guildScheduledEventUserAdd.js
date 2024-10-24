const { Events, User } = require('discord.js');

module.exports = {
	name: Events.GuildScheduledEventUserAdd,
	execute(user) {
		console.log(user)
	},
};