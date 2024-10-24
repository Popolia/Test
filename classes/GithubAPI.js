// Remplacez require par import
import dotenv from '../env.mjs'; 

// Aucune autre importation à ajouter ici

import { Octokit } from "octokit";

class GithubAPI {
    async ConnexionGithub() {
        const octokit = new Octokit({ auth: process.env.GITHUBTOKEN });
        const {
            data: { login },
        } = await octokit.rest.users.getAuthenticated();
        console.log("Hello, %s", login);
        return octokit;
    }

    async Recupfichier(octokit, chemin) {
        let fichiergithub = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
            owner: 'Pampisora',
            repo: 'Bot-Discord-Gabranth',
            path: chemin,
        });

        let sha = fichiergithub.data.sha;
        return sha;
    }

    async Modiffichier(octokit, contenu, SHA, chemin, commit) {
        let encodage = Buffer.from(contenu, 'utf8').toString('base64');
        await octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
            owner: 'Pampisora',
            repo: 'Bot-Discord-Gabranth',
            path: chemin,
            message: commit,
            content: encodage,
            sha: SHA,
        });
        console.log('fichier mis à jour sur Github: ' + chemin);
    }
}

module.exports = GithubAPI; // Utilisez export pour ESM
