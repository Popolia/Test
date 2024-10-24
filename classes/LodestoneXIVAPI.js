require('dotenv').config();
const XIVAPI = require('@xivapi/js');
const xiv = new XIVAPI({
    private_key: process.env.XIVTOKEN,
    language: 'fr'
});

class LodestoneXIVAPI {

    async ObtentionIDpersonnage(nom, serveur) {
        console.log('Lancement ID personnage : ' + nom)
        //find the character with their name and server
        if (serveur == null) {
           console.log('Début de la recherche de ' + nom + ' sur le serveur : Moogle')
            var res = await xiv.character.search(nom, { server: 'Moogle' })
        }
        else {
            console.log('Début de la recherche de ' + nom + ' sur le serveur : ' + serveur)
            var res = await xiv.character.search(nom, { server: serveur })
        }
        if (res.Results[0] == null) {
            return 'error'
        } else {
            return res.Results[0].ID
        }
    }

    async ObtentionInfopersonnage(IDpersonnage) {
        console.log('ID personnage : Obtention des données en cours de ' + IDpersonnage)
        let infoperso = await xiv.character.get(IDpersonnage, { data: 'FC', extended: 'true'})
        console.log('ID personnage : Obtention des données terminer de ' + IDpersonnage)
        return infoperso
    }

    async ObtentionInfoMonturepersonnage(IDpersonnage) {
        console.log('Info Monture : Obtention des données en cours')
        let infopersomonture = await xiv.character.get(IDpersonnage, { data: 'MIMO', columns: 'Mounts,Character'})
        console.log('Info Monture : Obtention des données terminer')
        console.log(infopersomonture)
        return infopersomonture
    }
}

module.exports = LodestoneXIVAPI