import dotenv from 'dotenv';
import XIVAPI from '@xivapi/js';
// Si ce fichier s'appelle aussi LodestoneXIVAPI.js
import LodestoneAPI from './LodestoneXIVAPI.js';

dotenv.config();

const xiv = new XIVAPI({
    private_key: process.env.XIVTOKEN,
    language: 'fr'
});

// Votre classe et autres fonctions ici...

class LodestoneXIVAPI {

    async ObtentionIDpersonnage(nom, serveur) {
        console.log('Lancement ID personnage : ' + nom);
        let res;

        try {
            if (serveur == null) {
                console.log('Recherche de ' + nom + ' sur le serveur : Moogle');
                res = await xiv.character.search(nom, { server: 'Moogle' });
            } else {
                console.log('Recherche de ' + nom + ' sur le serveur : ' + serveur);
                res = await xiv.character.search(nom, { server: serveur });
            }

            if (!res || !res.Results || res.Results.length === 0) {
                return 'error';
            } else {
                return res.Results[0].ID;
            }
        } catch (error) {
            console.error('Erreur lors de la recherche de personnage:', error);
            throw error;
        }
    }

    async ObtentionInfopersonnage(IDpersonnage) {
        try {
            console.log('ID personnage : Obtention des données en cours de ' + IDpersonnage);
            let infoperso = await xiv.character.get(IDpersonnage, { data: 'FC', extended: 'true' });
            console.log('ID personnage : Obtention des données terminées de ' + IDpersonnage);
            return infoperso;
        } catch (error) {
            console.error('Erreur lors de l\'obtention des informations du personnage:', error);
            throw error;
        }
    }

    async ObtentionInfoMonturepersonnage(IDpersonnage) {
        try {
            console.log('Info Monture : Obtention des données en cours');
            let infopersomonture = await xiv.character.get(IDpersonnage, { data: 'MIMO', columns: 'Mounts,Character' });
            console.log('Info Monture : Obtention des données terminées');
            return infopersomonture;
        } catch (error) {
            console.error('Erreur lors de l\'obtention des informations de monture:', error);
            throw error;
        }
    }
}

export default LodestoneXIVAPI;
