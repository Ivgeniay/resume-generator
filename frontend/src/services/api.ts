import axios from "axios";
import type { ApiResponse } from "../types";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

export const api = axios.create({
	baseURL: API_BASE_URL,
	timeout: 30000,
	headers: {
		"Content-Type": "application/json",
	},
});

api.interceptors.request.use(
	(config) => {
		// console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
		return config;
	},
	(error) => {
		console.error("API Request Error:", error);
		return Promise.reject(error);
	}
);

api.interceptors.response.use(
	(response) => {
		// console.log(`API Response: ${response.status} ${response.config.url}`);
		return response;
	},
	(error) => {
		console.error(
			"API Response Error:",
			error.response?.data || error.message
		);

		if (error.response?.status === 500) {
			console.error("Server Error - Please try again later");
		}

		if (error.code === "ECONNABORTED") {
			console.error("Request Timeout - Please check your connection");
		}

		return Promise.reject(error);
	}
);

export const handleApiError = (error: any): string => {
	if (error.response?.data?.error) {
		return error.response.data.error;
	}

	if (error.response?.data?.message) {
		return error.response.data.message;
	}

	if (error.code === "ECONNABORTED") {
		return "Request timeout. Please try again.";
	}

	if (error.response?.status === 500) {
		return "Server error. Please try again later.";
	}

	if (error.response?.status === 404) {
		return "Resource not found.";
	}

	return error.message || "An unexpected error occurred.";
};

export const isApiResponse = <T>(data: any): data is ApiResponse<T> => {
	return data && typeof data === "object" && "success" in data;
};
