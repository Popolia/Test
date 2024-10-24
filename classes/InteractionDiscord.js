const Discord = require('discord.js');
const { ActionRowBuilder, Events, ModalBuilder, TextInputBuilder, TextInputStyle, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

class ActionDiscord {

    AjoutRole(member, role) { //Ajout d'un rôle à l'utilisateur
        member.roles.add(role);
    }
    CouleurEmbed() { //Couleur aléatoire pour embed
        let colorX = Math.floor((Math.random()*26))
        //let color = ['1ABC9C', '11806A', '57F287', '1F8B4C', '3498DB', '206694', '9B59B6', '71368A', 'E91E63', 'AD1457', 'F1C40F', 'C27C0E', 'E67E22', 'A84300', 'ED4245', '992D22', 
        //             '95A5A6', 'FFFF00', '7F8C8D', 'BCC0C0', '34495E', '2C3E50', '979C9F']
        console.log('colorX ' + colorX)
        let color = ['Green', 'Aqua', 'DarkAqua', 'DarkGreen', 'Blue', 'DarkBlue', 'Purple', 'DarkPurple', 'LuminousVividPink', 'DarkVividPink', 'Gold', 'DarkGold', 'Orange', 'DarkOrange', 'Red', 'DarkRed', 
                     'Grey', 'DarkGrey', 'DarkerGrey', 'LightGrey', 'Navy', 'DarkNavy', 'Yellow', 'Greyple', 'Blurple', 'Fuchsia', 'Red']
        //let couleur = '0x'
        let couleur = color[colorX]
        return couleur;
    }
    VerificationDroit(interaction, roleverif) { //vérification de droit par rôle
        if (interaction.member.roles.cache.find(r => r.name === roleverif)) {
            return true
        }
        else {
            return false
        }
    }

}

module.exports = ActionDiscord