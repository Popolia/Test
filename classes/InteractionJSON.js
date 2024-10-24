const fs = require('fs')
const githubAPI = require ('../classes/GithubAPI');

class ActionJSON {

    async Chargementuserlist(){
        let membres = fs.readFileSync('./json/membresV2.json', 'utf-8')
        console.log(membres)
        let membresDejaInscrit = JSON.parse(membres)
        return membresDejaInscrit
    }

    async VerifUtilisateur(membresDejaInscrit, discordidPersonnage, lodestoneidPersonnage) { //Vérification de l'utilisateur
        let listlodIDJson = membresDejaInscrit.map((lodid) => lodid.lodestoneid)
        let listdisIDJson = membresDejaInscrit.map((disid) => disid.discordid)
        console.log("liste id lodestone")
        console.log(listlodIDJson)
        console.log("liste id discord")
        console.log(listdisIDJson)
        let verif = false
        if(!listlodIDJson.includes(lodestoneidPersonnage) && !listdisIDJson.includes(discordidPersonnage)) {
            //return await interaction.reply({content: 'Le personnage est déjà lié a un membre du serveur', ephemeral: true})
            console.log("utilisateur non existant")
            return verif = true
            
        } else {
           /* console.log("personnage non existant")
            if(listdisIDJson.includes(discordidPersonnage)) {
                //return await interaction.reply({content: 'le profil discord a déjà un personnage', ephemeral: true})
                return verif = false
            } else {*/
                console.log("utilisateur existant")
                return verif = false
            }
        
        //return [verif = false
    }

    async VerifUtilisateurdiscord(membresDejaInscrit, discordid) { //Vérification de l'utilisateur
        let listdisIDJson = membresDejaInscrit.map((disid) => disid.discordid)
        console.log("liste id discord")
        console.log(listdisIDJson)
        let verif = false
        if(listdisIDJson.includes(discordidPersonnage)) {
            console.log("utilisateur existant")
            return verif = true
            
        } else {
                console.log("utilisateur non existant")
                return verif = false
            }
    }

    async LienUtilisateur(membresDejaInscrit, discordidPersonnage, lodestoneidPersonnage, nom) { //ajout du membre dans le json membre     
            let nouvmembre = {
              lodestoneid: lodestoneidPersonnage,
              discordid: discordidPersonnage,
              nom
            }
            membresDejaInscrit.push(nouvmembre)
            console.log(membresDejaInscrit)
            let membresajout = JSON.stringify(membresDejaInscrit, null, 2)
            fs.writeFileSync('./json/membres.json', membresajout)
            return membresajout
    }

    async SuppressionUtilisateur(idmembre, nom) { //ajout du membre dans le json membre     

        let membres = fs.readFileSync('./json/membres.json', 'utf-8')
        console.log(membres)
        let membresDejaInscrit = JSON.parse(membres)
        //let listemembre = membresDejaInscrit.discordid.map
        for (let index = 0; index < membresDejaInscrit.length; index++) {
            console.log(membresDejaInscrit[index].discordid)
            if(idmembre === membresDejaInscrit[index].discordid)
        {
            const indexElementASupprimer = membresDejaInscrit.findIndex((membre) => membre.discordid === idmembre) //le === tu met la condition que t'as besoin, faut que ça cible celui que tu veux jeter
            membresDejaInscrit.splice(indexElementASupprimer, 1)
            console.log(membresDejaInscrit) // l'élément a été supprimer normalement
            let membresajout = JSON.stringify(membresDejaInscrit, null, 2)
            fs.writeFileSync('./json/membres.json', membresajout)
            const actionGithub = new githubAPI()
            let octokit = await actionGithub.ConnexionGithub()
            let sha = await actionGithub.Recupfichier(octokit, "json/membres.json")
            actionGithub.Modiffichier(octokit, membresajout, sha, "json/membres.json", "membre retiré: " + nom)
        }
        else{
            console.log('Membre inexistant dans base de données : ' + nom)
        } 
        }
        
        }

    async ParseJSON(nomfichier){

    let json = fs.readFileSync('./json/' + nomfichier + '.json', 'utf-8')
    console.log(json)
    let jsonparse = JSON.parse(json)
    console.log(jsonparse)
    return jsonparse
    }

    async RecupIDLodestone(iddiscord){
        let membres = fs.readFileSync('./json/membres.json', 'utf-8')
        console.log(membres)
        let listIDJson = JSON.parse(membres)
        console.log("liste json")
        console.log(listIDJson)
        let tableauid = [[],[]]
        let x = 0
        listIDJson.forEach((listID) => {        
            if(iddiscord.includes(listID.discordid)) {
                    tableauid[x][0] = listID.discordid
                    tableauid[x][1] = listID.lodestoneid
                    x++
            }
            console.log(tableauid)
        })
        return tableauid
    }
}

module.exports = ActionJSON