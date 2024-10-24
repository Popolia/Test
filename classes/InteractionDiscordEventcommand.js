import { PermissionFlagsBits } from 'discord.js';
import { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, EmbedBuilder } from 'discord.js';
import xivlodestone from '../classes/LodestoneXIVAPI.js';
import interactJSON from '../classes/InteractionJSON.js'; // Assurez-vous que ce chemin est correct et que InteractionJSON a une exportation par défaut
import interactdiscord from '../classes/InteractionDiscord.js';
import interactdiscordimage from '../classes/InteractionImageDiscord.js';

class ActionModalEvenement {
    choixevent = [];
    tableauchoix = [];
    tag = '';

    // Récupération de la liste des événements
    async recupererEvenementListe(interaction) {
        const listevent = await interaction.guild.scheduledEvents.fetch();
        this.tableauchoix = Array.from(listevent);
        
        this.choixevent = this.tableauchoix.map(([id, event]) => {
            console.log(event);
            return event.name;
        });

        console.log(this.choixevent);
    }

    // Autocomplétion pour les événements
    async autocomplete(interaction) {
        const valeurSaisie = interaction.options.getFocused();
        const choixFiltres = this.choixevent.filter((choixCourant) => choixCourant.startsWith(valeurSaisie));

        console.log(valeurSaisie);
        await interaction.respond(choixFiltres.map((choix) => ({ name: choix, value: choix })));
    }

    // Affichage du modal pour taguer l'événement
    async modalevenement(interaction, event) {
        this.tag = '';
        const numeroevent = this.choixevent.indexOf(event);
        
        if (numeroevent === -1) {
            return await interaction.reply({ content: "Erreur lors de la commande", ephemeral: true });
        }

        const eventid = this.tableauchoix[numeroevent][0];
        const eventdate = Math.trunc(this.tableauchoix[numeroevent][1].scheduledStartTimestamp / 1000);
        this.tag += `<t:${eventdate}:R>\n\n`;

        const eventuser = await interaction.guild.scheduledEvents.fetchSubscribers(eventid);
        const tableauuser = Array.from(eventuser);
        
        tableauuser.forEach(([userId]) => {
            this.tag += `<@${userId}> `;
        });

        const modal = new ModalBuilder()
            .setCustomId('ModalEventTag')
            .setTitle('Tag événement');

        const messagetag = new TextInputBuilder()
            .setCustomId('messagetag')
            .setLabel('Quel est le message à ajouter avec le tag ?')
            .setStyle(TextInputStyle.Paragraph);

        const champs = new ActionRowBuilder().addComponents(messagetag);
        modal.addComponents(champs);
        
        await interaction.showModal(modal);
    }

    // Réponse au modal
    async reponsemodalevenement(interaction, messagetag) {
        await interaction.reply({ content: `${messagetag} ${this.tag}` });
    }

    // Récupération des montures des utilisateurs dans l'événement
    async montureevenement(interaction, event) {
        const numeroevent = this.choixevent.indexOf(event);
        
        if (numeroevent === -1) {
            return await interaction.reply({ content: "Erreur lors de la commande", ephemeral: true });
        }

        const eventid = this.tableauchoix[numeroevent][0];
        const eventuser = await interaction.guild.scheduledEvents.fetchSubscribers(eventid);
        const tableauuser = Array.from(eventuser).map(([userId]) => userId);
        
        return tableauuser;
    }

    // Traitement des montures d'événements
    async eventmount(interaction, lieu, extension, tableauuser) {
        const xivlod = new xivlodestone();
        const actionJSON = new interactJSON();
        const montureBDD = await actionJSON.ParseJSON('liste_monture copy');
        const listIDJson = await actionJSON.Chargementuserlist();

        let listeinstance = [];
        let listemonturenom = [];
        let listemonturenomFR = [];

        // Récupération des montures en fonction de l'extension et du lieu
        const types = {
            'A Realm Reborn': montureBDD.ARealmReborn,
            'Heavensward': montureBDD.Heavensward,
            'Stormblood': montureBDD.Stormblood,
            'Shadowbringers': montureBDD.Shadowbringers,
            'Endwalker': montureBDD.Endwalker,
        };

        const lieux = ['Defis', 'Raids'];
        if (types[extension] && lieux.includes(lieu)) {
            listeinstance = types[extension][lieu].map((filtre) => filtre.instance);
            listemonturenom = types[extension][lieu].map((filtre) => filtre.nom);
            listemonturenomFR = types[extension][lieu].map((filtre) => filtre.nomfr);
        }

        console.log(listeinstance, listemonturenom, listemonturenomFR);

        const monturesNonPossedees = await Promise.all(listIDJson.map(async (listID) => {
            if (tableauuser.includes(listID.discordid)) {
                const infoperso = await xivlod.ObtentionInfoMonturepersonnage(listID.lodestoneid);
                const nomMonturesPersonnage = infoperso.Mounts.map((monture) => monture.Name);

                return listemonturenom.filter((montureACheck) => !nomMonturesPersonnage.includes(montureACheck))
                    .map(() => `<:dot1:1072656154024497152> <@${listID.discordid}> \n`);
            }
            return [];
        }));

        // Construction des instances finales
        const listeFinale = monturesNonPossedees.flat();
        console.log('Final:', listeFinale);

        // Création des embeds
        const embeds = await this.creerEmbeds(listeFinale, lieu, extension, listemonturenomFR);
        
        if (embeds.length === 0) {
            return await interaction.editReply({ content: 'Toutes les montures sont possédées' });
        }

        return await interaction.editReply({ embeds });
    }

    // Création des embeds
    async creerEmbeds(listeFinale, lieu, extension, listemonturenomFR) {
        const actionDiscord = new interactdiscord();
        const ActionDiscordimage = new interactdiscordimage();

        const embeds = await Promise.all(listeFinale.map(async (desc, index) => {
            const title = lieu === 'Defis'
                ? `<:defis:1020685727538876446> Instance ${index + 1}\n<:Montures1:1156896278660259851> ${listemonturenomFR[index]}`
                : `<:raid:1020685761600827502> Instance ${index + 1}\n<:Montures1:1156896278660259851> ${listemonturenomFR[index]}`;

            const couleur = actionDiscord.CouleurEmbed();
            const image = await ActionDiscordimage.lienimageinstance(`Instance ${index + 1}`, extension, lieu);

            return new EmbedBuilder()
                .setColor(couleur)
                .setTitle(title)
                .addFields({ name: 'Non possédée par:', value: desc, inline: true })
                .setThumbnail(image[1])
                .setImage(image[0]);
        }));

        return embeds;
    }

    // Méthode pour attendre
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

export default ActionModalEvenement;
