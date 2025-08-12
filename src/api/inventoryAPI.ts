import axios from "axios";

export const inventoryAPI = axios.create({
	baseURL: import.meta.env.VITE_API_BASE,
});

// Add a request interceptor to add the authorization header
inventoryAPI.interceptors.request.use(
	(config) => {
		// const accessToken = getAccessToken();
		// if (accessToken) {
		// 	config.headers.Authorization = `Bearer ${accessToken}`;
		// }
		return config;
	},
	(error) => Promise.reject(error),
);
