const fs = require('fs')
const githubAPI = require ('./GithubAPI');
const { timeStamp } = require('console');

class ActionGoogle {

    async parselistemembre(listemembre) { //ajout des membre dans le json membres pour google sheet, listemembre = liste du serveur discord  
            let membrelist = []
            listemembre.forEach((member) => {
                console.log(member)
                let verifbot = false
                let verifaffiliation = false
                for (let index = 0; index < member._roles.length; index++) {
                    switch (member._roles[index]) {
                        case "335113070131019776":
                            console.log(member.user.username + " BOT")
                            verifbot = true
                            break;
                    
                        case "1297699952675524638":
                            console.log(member.user.username + " Non joueur FFXIV")
                            verifbot = true
                            break;
                        case "335110628060692490":
                            verifaffiliation = true
                            break;
                    }     
                }
                if (verifbot == false) {
                    console.log(member.user.username);
                    let pseudomember
                    let affilmember
                    if (member.nickname === null) {
                        pseudomember = member.user.globalName
                    }
                    else{
                        pseudomember = member.nickname
                    }
                    if (verifaffiliation == true) {
                        affilmember = "Realm of Ivalice"
                    } else {
                        affilmember = "Pirates du ciel"
                    }
                    let idmember =  member.user.id
                    let nouvmembre = {
                        pseudo: pseudomember,
                        discordid: idmember,
                        affiliation: affilmember
                    }
                    membrelist.push(nouvmembre)
                } 
            });
            console.log(membrelist)
            let membresjson = JSON.stringify(membrelist, null, 2)
            fs.writeFileSync('./json/membres_google_sheet.json', membresjson)
            const actionGithub = new githubAPI()
            let octokit = await actionGithub.ConnexionGithub()
            let sha = await actionGithub.Recupfichier(octokit, "json/membres_google_sheet.json")
            actionGithub.Modiffichier(octokit, membresjson, sha, "json/membres_google_sheet.json", "Liste mise à jour")
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

module.exports = ActionGoogle