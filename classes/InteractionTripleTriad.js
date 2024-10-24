const { PermissionFlagsBits } = require('discord.js');
const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, EmbedBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require('discord.js');
const xivlodestone = require ('../classes/LodestoneXIVAPI');
const interactJSON = require ('../classes/InteractionJSON');
const interactdiscord = require ('../classes/InteractionDiscord');
const interactdiscordimage = require ('../classes/InteractionImageDiscord');
var tripletriadBDDnom = []

class ActionDiscordimage {

    async chargementBDDTT() { //Charge une image d'instance depuis le serveur discord
        let requestOptions = {
			method: 'GET',
			redirect: 'follow'
		  };
		  let tripletriadBDD
		  await fetch("https://triad.raelys.com/api/cards?language=fr", requestOptions)
			.then(response => response.text())
			.then(result => tripletriadBDD = JSON.parse(result))
			.then(result => console.log(result))
			.catch(error => console.log('error', error));
            tripletriadBDDnom = tripletriadBDD.results//tripletriadBDD.map((resultat) => resultat.results)
                console.log(tripletriadBDDnom)
    }

    async rechercheBDDTT(interaction, nom) { //Charge une image d'instance depuis le serveur discord
        try {
            let requestOptions = {
                method: 'GET',
                redirect: 'follow'
              };
              let tripletriadBDD
              await fetch("https://triad.raelys.com/api/cards?name_en_cont=" + nom + "&language=fr", requestOptions)
                .then(response => response.text())
                .then(result => tripletriadBDD = JSON.parse(result))
                .then(result => console.log(result))
                .catch(error => console.log('error', error));
                tripletriadBDDnom = tripletriadBDD.results//tripletriadBDD.map((resultat) => resultat.results)
                    console.log(tripletriadBDDnom)
                    console.log(tripletriadBDDnom[0].sources.npcs[0])
                    console.log(tripletriadBDDnom[0].sources.drops[0])
                    let obtention = ''
                    if (tripletriadBDDnom[0].sources.npcs[0] === undefined) {
                        let obtentiontempo = ''
                        for (let index = 0; index < tripletriadBDDnom[0].sources.drops.length; index++) {
                            obtentiontempo = tripletriadBDDnom[0].sources.drops[index] + '\n'
                            if(obtentiontempo.substring(0, 5) == 'Trial')
                            {
                                    obtention += '<:defis:1020685727538876446> ' + obtentiontempo.substring(6, obtentiontempo.length)
                            }
                            else if(obtentiontempo.substring(0, 5) == 'Raid:')
                            {
                                    obtention += '<:raid:1020685761600827502> ' + obtentiontempo.substring(6, obtentiontempo.length)
                            }                           
                        }
                    } else {
                        for (let index = 0; index < tripletriadBDDnom[0].sources.npcs.length; index++) {
                            obtention += '<:LVL:1021449774811054111> ' + tripletriadBDDnom[0].sources.npcs[index].name + '\n'
                        }
                        
                    }
                    
                    const actionDiscord = new interactdiscord()
                    let couleur = actionDiscord.CouleurEmbed()
                    let embed = new EmbedBuilder()
                    .setColor(couleur)
                    .setTitle('<:carteTT:1072650996871856219> ' + tripletriadBDDnom[0].name)
                    .setDescription(tripletriadBDDnom[0].description)
                    .addFields({ name: 'Obtenu sur:', value: obtention, inline: true })
                    .setThumbnail(tripletriadBDDnom[0].image)
               return  await interaction.editReply({embeds: [embed] })
        } catch (error) {
            console.log(error)
            return  await interaction.editReply({content: 'Impossible de trouver la carte' })
        }
        
    }

    async autocompleteTT(interaction) {
        let tripletriadlist = tripletriadBDDnom.slice(0, 24)
        const valeurSaisie = interaction.options.getFocused(),
            choixFiltres = tripletriadlist.filter((choixCourant) => choixCourant.startsWith(valeurSaisie))
        console.log(valeurSaisie)

        await interaction.respond(choixFiltres.map((choix) => ({name: choix, value: choix})))
    }

    async selectmenuTT(interaction) {
        let tableau = []
        let StringSelectMenuOptionBuilder = []
        for (let index = 0; index < 25; index++) {
            let carte = {
                description: 'carte' + index.description,
                emoji: undefined,
                label:'carte' + index,
                value:'carte' + index
              }
              tableau.push(carte)
        }
        //let StringSelectMenuOptionBuilder['StringSelectMenuOptionBuilder'] = Object.assign({}, tableau)
        //let StringSelectMenuOptionBuilder
//        tableau.forEach((elem) => {
//           StringSelectMenuOptionBuilder[`StringSelectMenuOptionBuilder`] = elem
//          })
        /*let StringSelectMenuOptionBuildersss = {
            description: 'The dual-type Grass/Poison Seed Pokémon.',
            emoji: undefined,
            label:tripletriadBDDnom[index],
            value:'bulbasaur'
            
          }*/
          
          StringSelectMenuOptionBuilder = tableau
        const Select = new StringSelectMenuBuilder()
        .setCustomId('selectTT')
        .setPlaceholder('Select multiple users.')
        .addOptions(StringSelectMenuOptionBuilder
        );

        const row1 = new ActionRowBuilder()
        .addComponents(Select);

        await interaction.reply({
			content: 'Select users:',
			components: [row1],
		})
    }

    

}

module.exports = ActionDiscordimage