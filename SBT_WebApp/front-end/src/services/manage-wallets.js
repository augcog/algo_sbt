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

async function getManageWallets(workspaceId, spaceId, listId){
    try {
        const wallets = await httpClient.get(`${BASE_URL}/manage-wallets/${workspaceId}?spaceId=${spaceId}&listId=${listId}`,{})
        return wallets?.data?.data || []
    } catch (error) {
        return []
    }
}

export {
    saveManageWallets, 
    getManageWallets
}