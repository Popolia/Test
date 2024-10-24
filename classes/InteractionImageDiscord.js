const Discord = require('discord.js');
const { ActionRowBuilder, Events, ModalBuilder, TextInputBuilder, TextInputStyle, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const interactJSON = require ('../classes/InteractionJSON');

class ActionDiscordimage {

    async lienimageinstance(nom, extension, lieu) { //Charge une image d'instance depuis le serveur discord
        nom = nom + "\n"
        let lienimage = []
        const actionJSON = new interactJSON()
        let montureBDD = await actionJSON.ParseJSON('liste_monture copy')
        switch (extension) {
            case 'A Realm Reborn':
                if (lieu === 'Defis') {
                    montureBDD.ARealmReborn.Defis.forEach((nominstance)=> {
                        if(nom.includes(nominstance.instance)) {
                            lienimage[0] = nominstance.imageinstance
                            lienimage[1] = nominstance.imagemonture
                        }
                    })
                }else if (lieu === 'Raids') {
                    montureBDD.ARealmReborn.Raids.forEach((nominstance)=> {
                        if(nom.includes(nominstance.instance)) {
                            lienimage[0] = nominstance.imageinstance
                            lienimage[1] = nominstance.imagemonture
                        }
                    })
                }
                break;
        
            case 'Heavensward':
                if (lieu === 'Defis') {
                    montureBDD.Heavensward.Defis.forEach((nominstance)=> {
                        if(nom.includes(nominstance.instance)) {
                            lienimage[0] = nominstance.imageinstance
                            lienimage[1] = nominstance.imagemonture
                        }
                    })
                }else if (lieu === 'Raids') {
                    montureBDD.Heavensward.Raids.forEach((nominstance)=> {
                        if(nom.includes(nominstance.instance)) {
                            lienimage[0] = nominstance.imageinstance
                            lienimage[1] = nominstance.imagemonture
                        }
                    })
                }
                break;

            case 'Stormblood':
                if (lieu === 'Defis') {
                    montureBDD.Stormblood.Defis.forEach((nominstance)=> {
                        if(nom.includes(nominstance.instance)) {
                            lienimage[0] = nominstance.imageinstance
                            lienimage[1] = nominstance.imagemonture
                        }
                    })
                }else if (lieu === 'Raids') {
                    montureBDD.Stormblood.Raids.forEach((nominstance)=> {
                        if(nom.includes(nominstance.instance)) {
                            lienimage[0] = nominstance.imageinstance
                            lienimage[1] = nominstance.imagemonture
                        }
                    })
                }               
                break;

            case 'Shadowbringers':
                if (lieu === 'Defis') {
                    montureBDD.Shadowbringers.Defis.forEach((nominstance)=> {
                        if(nom.includes(nominstance.instance)) {
                            lienimage[0] = nominstance.imageinstance
                            lienimage[1] = nominstance.imagemonture
                        }
                    })
                }else if (lieu === 'Raids') {
                    montureBDD.Shadowbringers.Raids.forEach((nominstance)=> {
                        if(nom.includes(nominstance.instance)) {
                            lienimage[0] = nominstance.imageinstance
                            lienimage[1] = nominstance.imagemonture
                        }
                    })
                }                
                break;

            case 'Endwalker':
                if (lieu === 'Defis') {
                    montureBDD.Endwalker.Defis.forEach((nominstance)=> {
                        if(nom.includes(nominstance.instance)) {
                            lienimage[0] = nominstance.imageinstance
                            lienimage[1] = nominstance.imagemonture
                        }
                    })
                }else if (lieu === 'Raids') {
                    montureBDD.Endwalker.Raids.forEach((nominstance)=> {
                        if(nom.includes(nominstance.instance)) {
                            lienimage[0] = nominstance.imageinstance
                            lienimage[1] = nominstance.imagemonture
                        }
                    })
                }                
                break;
            default:
                break;
        }
/*        montureBDD.forEach((nominstance)=> {
            if(nom.includes(nominstance.instance)) {
                lienimage[0] = nominstance.imageinstance
                lienimage[1] = nominstance.imagemonture
            }
        })
        montureBDD.Shadowbringers.Raids.forEach((nominstance)=> {
            if(nom.includes(nominstance.instance)) {
                lienimage[0] = nominstance.imageinstance
                lienimage[1] = nominstance.imagemonture
            }
        })*/
        return lienimage
    }

}

module.exports = ActionDiscordimage