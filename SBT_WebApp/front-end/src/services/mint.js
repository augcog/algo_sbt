import httpClient from "../gateway/http-client"
import { PY_BASE_URL } from "./config"

async function saveMintSBT(body){
    try {
        const mintResponse = await httpClient.post(
            `${PY_BASE_URL}/mint`,body
        )

        return mintResponse.data?.assetid;

	} catch (error) {
		console.log(error)
	}
}

export {
    saveMintSBT
}