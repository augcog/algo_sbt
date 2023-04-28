import httpClient from "../gateway/http-client"
import { PY_BASE_URL } from "./config"

async function saveRevokeSBT(body){
    try {
        const revokeResponse = await httpClient.post(
            `${PY_BASE_URL}/revoke`,body
        )
        return revokeResponse.data?.res;

	} catch (error) {
		console.log(error)
	}
}

export {
    saveRevokeSBT
}