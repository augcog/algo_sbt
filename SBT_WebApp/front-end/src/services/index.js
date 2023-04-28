import httpClient from "../gateway/http-client"
import { BASE_URL } from "./config"

async function getWorkspaces(){
    try {
        const workspaces = await httpClient.get(
            `${BASE_URL}/workspaces`
        )
        return workspaces
	} catch (error) {
		console.log(error)
	}
}

async function getUser(){
    try {
        const user = await httpClient.get(
            `${BASE_URL}/user`
        )
        return user
	} catch (error) {
		console.log(error)
	}
}

async function getSpaces(id){
    try {
        const spaces = await httpClient.get(
            `${BASE_URL}/spaces/${id}`
        )
        return spaces
	} catch (error) {
		console.log(error)
	}
}

async function getLists(workspaceId, spaceId){
    try {
        const lists = await httpClient.get(
            `${BASE_URL}/spaces/${workspaceId}/lists/${spaceId}`
        )
        return lists
	} catch (error) {
		console.log(error)
	}
}

async function getTasks(workspaceId, spaceId, listId){
    try {
        const lists = await httpClient.get(
            `${BASE_URL}/spaces/${workspaceId}/lists/${spaceId}/tasks/${listId}`
        )
        return lists
	} catch (error) {
		console.log(error)
	}
}

async function saveContributions(body){
    try {
        await httpClient.post(
            `${BASE_URL}/contributions`,body
        )

	} catch (error) {
		console.log(error)
	}
}

async function saveMint(body){
    try {
        await httpClient.post(
            `${BASE_URL}/mint`,body
        )

	} catch (error) {
		console.log(error)
	}
}
async function saveIssue(body){
    try {
        await httpClient.post(
            `${BASE_URL}/issue`,body
        )

	} catch (error) {
		console.log(error)
	}
}

async function saveRevoke(body){
    try {
        await httpClient.post(
            `${BASE_URL}/revoke`,body
        )

	} catch (error) {
		console.log(error)
	}
}

export  {
    getWorkspaces, 
    getSpaces, 
    getLists,
    getTasks,
    saveContributions,
    getUser,
    saveMint,
    saveIssue,
    saveRevoke
}
