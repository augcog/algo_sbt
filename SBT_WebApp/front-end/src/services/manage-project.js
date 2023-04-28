import httpClient from "../gateway/http-client"
import { BASE_URL } from "./config"

async function saveProject(body){
    try {
        await httpClient.post(
            `${BASE_URL}/project-contrib`,body
        )

	} catch (error) {
		console.log(error)
	}
}

export {
    saveProject
}