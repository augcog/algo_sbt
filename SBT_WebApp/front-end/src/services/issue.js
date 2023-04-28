import httpClient from "../gateway/http-client"
import { PY_BASE_URL } from "./config"

async function saveIssueSBT(body){
    try {
        const issueResponse = await httpClient.post(
            `${PY_BASE_URL}/issue`,body
        )
        return issueResponse.data?.res;

	} catch (error) {
		console.log(error)
	}
}

export {
    saveIssueSBT
}