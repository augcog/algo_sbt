import axios from "axios"
const apiClient = axios.create()

// Request interceptor for API calls
apiClient.interceptors.request.use(
	async (config) => {
		return config
	},
	(error) => {
		Promise.reject(error)
	}
)

export default apiClient