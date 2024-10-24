const { Events, Guild } = require('discord.js');
const interactdiscordeventcommand = require('../classes/InteractionDiscordEventcommand');

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction, client) {

			if (interaction.isCommand()) {
				const command = interaction.client.commands.get(interaction.commandName);
				try {
					await command.execute(interaction, client);
				} catch (error) {
					console.error(error);
					await interaction.reply({ content: 'Il y a eu une erreur lors de la commande !', ephemeral: true });
				}
			} else if (interaction.isAutocomplete()) {
				const command = interaction.client.commands.get(interaction.commandName);

				if (!command) {
					console.error(`No command matching ${interaction.commandName} was found.`);
					return;
				}

				try {
			
					await command.autocomplete(interaction);
				} catch (error) {
					console.error(error);
				}
			}
			else if (interaction.isModalSubmit()) {
				if (interaction.customId === 'ModalEventTag'){
					const messagetag = interaction.fields.getTextInputValue('messagetag')
					console.log({messagetag})
					const interactdiscordevcom = new interactdiscordeventcommand()
					interactdiscordevcom.reponsemodalevenement(interaction, messagetag)
					//await interaction.reply({content: messagetag})
				}	
			}
			else if (interaction.isButton()) {
				// respond to the button
				if (interaction.customId === 'Buttontest'){
					
					//interaction.reply({content: 'ping'})
					interaction.channel.send("dummy message");
				}	
			} 
			else if (interaction.isStringSelectMenu()) {
				// respond to the select menu
			}
	},
};