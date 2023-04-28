import httpClient from "../gateway/http-client"
import { BASE_URL } from "./config"

async function saveManageWallets(body){
    try {
        await httpClient.post(
            `${BASE_URL}/manage-wallets`,body
        )

	} catch (error) {
		console.log(error)
	}
}

export {
    saveManageWallets
}