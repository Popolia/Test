export default interactJSON; // ou remplace `interactJSON` par l'objet principal exporté
const fs = require('fs');
const GithubAPI = require('../classes/GithubAPI');

class ActionJSON {
    async Chargementuserlist() {
        try {
            const membres = fs.readFileSync('./json/membresV2.json', 'utf-8');
            console.log(membres);
            const membresDejaInscrit = JSON.parse(membres);
            return membresDejaInscrit;
        } catch (error) {
            console.error("Erreur lors du chargement de membresV2.json :", error);
            return [];
        }
    }

    async VerifUtilisateur(membresDejaInscrit, discordidPersonnage, lodestoneidPersonnage) {
        const listlodIDJson = membresDejaInscrit.map((lodid) => lodid.lodestoneid);
        const listdisIDJson = membresDejaInscrit.map((disid) => disid.discordid);
        console.log("liste id lodestone", listlodIDJson);
        console.log("liste id discord", listdisIDJson);

        if (!listlodIDJson.includes(lodestoneidPersonnage) && !listdisIDJson.includes(discordidPersonnage)) {
            console.log("utilisateur non existant");
            return true;
        } else {
            console.log("utilisateur existant");
            return false;
        }
    }

    async VerifUtilisateurdiscord(membresDejaInscrit, discordid) {
        const listdisIDJson = membresDejaInscrit.map((disid) => disid.discordid);
        console.log("liste id discord", listdisIDJson);

        if (listdisIDJson.includes(discordid)) {
            console.log("utilisateur existant");
            return true;
        } else {
            console.log("utilisateur non existant");
            return false;
        }
    }

    async LienUtilisateur(membresDejaInscrit, discordidPersonnage, lodestoneidPersonnage, nom) {
        const nouveauMembre = { lodestoneid: lodestoneidPersonnage, discordid: discordidPersonnage, nom };
        membresDejaInscrit.push(nouveauMembre);
        console.log(membresDejaInscrit);

        const membresAjout = JSON.stringify(membresDejaInscrit, null, 2);
        try {
            fs.writeFileSync('./json/membres.json', membresAjout);
        } catch (error) {
            console.error("Erreur lors de l'écriture dans membres.json :", error);
        }
        return membresAjout;
    }

    async SuppressionUtilisateur(idmembre, nom) {
        try {
            const membres = fs.readFileSync('./json/membres.json', 'utf-8');
            const membresDejaInscrit = JSON.parse(membres);

            const indexElementASupprimer = membresDejaInscrit.findIndex((membre) => membre.discordid === idmembre);
            if (indexElementASupprimer !== -1) {
                membresDejaInscrit.splice(indexElementASupprimer, 1);
                console.log("Membre supprimé:", membresDejaInscrit);

                const membresAjout = JSON.stringify(membresDejaInscrit, null, 2);
                fs.writeFileSync('./json/membres.json', membresAjout);

                const actionGithub = new GithubAPI();
                const octokit = await actionGithub.ConnexionGithub();
                const sha = await actionGithub.Recupfichier(octokit, "json/membres.json");
                actionGithub.Modiffichier(octokit, membresAjout, sha, "json/membres.json", "Membre retiré : " + nom);
            } else {
                console.log('Membre inexistant dans la base de données :', nom);
            }
        } catch (error) {
            console.error("Erreur lors de la suppression de l'utilisateur :", error);
        }
    }

    async ParseJSON(nomfichier) {
        try {
            const json = fs.readFileSync(`./json/${nomfichier}.json`, 'utf-8');
            console.log(json);
            return JSON.parse(json);
        } catch (error) {
            console.error(`Erreur lors de la lecture de ${nomfichier}.json :`, error);
            return null;
        }
    }

    async RecupIDLodestone(iddiscord) {
        try {
            const membres = fs.readFileSync('./json/membres.json', 'utf-8');
            const listIDJson = JSON.parse(membres);

            const tableauid = listIDJson
                .filter((listID) => iddiscord.includes(listID.discordid))
                .map((listID) => [listID.discordid, listID.lodestoneid]);
            console.log("tableau d'ID:", tableauid);

            return tableauid;
        } catch (error) {
            console.error("Erreur lors de la récupération des ID Lodestone :", error);
            return [];

            // InteractionJSON.js

// Définir l'objet ou la fonction que vous souhaitez exporter
const interactJSON = {
    // Ajoutez ici les propriétés ou méthodes que vous voulez
    exampleMethod: function() {
        console.log('Ceci est une méthode d\'exemple.');
    }


// Exporter l'objet ou la fonction
        }
    }
}
};

module.exports = ActionJSON;
