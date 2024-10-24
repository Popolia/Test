// à déployer à chaque ajout de commandes dans la console avec : node deploy-commands.js

const fs = require('node:fs');
const path = require('node:path');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
require('dotenv').config()
const Bottoken = process.env.BOTTOKEN;
const guildID = process.env.GUILDID;
const clientID = process.env.APPID;

const commands = [];
const chemincommande = path.join(__dirname, 'commandsslash')
const commandFiles = fs.readdirSync(chemincommande).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(chemincommande, file);
	const command = require(filePath);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(Bottoken);

rest.put(Routes.applicationGuildCommands(clientID, guildID), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);