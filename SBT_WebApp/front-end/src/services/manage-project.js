import httpClient from "../gateway/http-client"
import { BASE_URL, PY_BASE_URL } from "./config"

async function saveProject(body){
    try {
        await httpClient.post(
            `${BASE_URL}/project-contrib`,body
        )

	} catch (error) {
		console.log(error)
	}
}

async function saveWallets(body){
    try {
       const html_files_hash = await httpClient.post(
            `${PY_BASE_URL}/manage-wallets`,body
        )

        return html_files_hash.data

	} catch (error) {
		console.log(error)
	}
}

export {
    saveProject, 
    saveWallets
}