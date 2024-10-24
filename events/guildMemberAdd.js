import { Events } from 'discord.js';
import InteractionDiscordEventcommand from '../classes/InteractionDiscordEventcommand.js';
import InteractionJSON from '../classes/InteractionJSON.js';
import InteractionGoogle from '../classes/InteractionGoogle.js';

export default {
    name: Events.GuildMemberAdd,
    async execute(interaction, client) {
        console.log(interaction);
        try {
            const guild = client.guilds.cache.get("289881181527474178");
            let listemembre = await guild.members.fetch();
            const interactgoogle = new InteractionGoogle();
            interactgoogle.parselistemembre(listemembre);
            
            // Si vous avez besoin d'une instance de InteractionDiscordEventcommand
            const interactionCommand = new InteractionDiscordEventcommand();
            // Vous pouvez appeler des méthodes de cette classe ici si nécessaire

        } catch (error) {
            console.log(error);
        }
    },
};
