import apiClient from "./config";

const get = async (url, headers) => {
	try {
		if (!url) return { message: "url missing!" };

		//additional header for get request and other in process
		if (!headers) headers = {};

		return await apiClient.get(url, {
			headers: {
				"Content-Type": "application/json",
				...headers,
			},
		});
	} catch (error) {
        console.log(error)
    }
};


const post = async (url, body) => {
	if (!url) return { message: "url missing!" }

	if (!body) body = {}

	//additional header for get request and other in process
	return await apiClient
		.post(url, body, {
			headers: {
				"Content-Type": "application/json",
			},
		})
		.then((res) => ({
			status: res.status,
			success: true,
			data: res.data,
			message: res.message,
			error: res?.errors,
		}))
		.catch((error) => ({
			status: error.status,
			success: false,
			data: [],
			message: error.message,
			error: error,
		}))
}


export default { get, post };