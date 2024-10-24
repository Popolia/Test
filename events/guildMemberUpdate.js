const { Events, User } = require('discord.js');
const interactdiscordeventcommand = require('../classes/InteractionDiscordEventcommand');
const interactJSON = require ('../classes/InteractionJSON');
const interactionGoogle = require ('../classes/InteractionGoogle');

module.exports = {
	name: Events.GuildMemberUpdate,
	async execute(interaction, client) {
        console.log(interaction)
		console.log(client)
        /*const actionJSON = new interactJSON()
		let discordid = '' + interaction.user.id
		let nom = interaction.member.nickname
		actionJSON.SuppressionUtilisateur(discordid, nom)*/
		/*const guild = client.guild.members.client.guilds.cache.get("289881181527474178");
        let listemembre = await guild.members.fetch();
        const interactgoogle = new interactionGoogle()
        interactgoogle.parselistemembre(listemembre)*/
	},
};
