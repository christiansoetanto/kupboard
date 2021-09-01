import { useState, useCallback } from "react";

const useHttp = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const sendRequest = useCallback(async (requestConfig, applyData) => {
		setIsLoading(true);
		setError(null);
		try {
			const isJson = requestConfig.isJson ?? true;
			const body = requestConfig.body ? (isJson ? JSON.stringify(requestConfig.body) : requestConfig.body) : null;
			let headers = requestConfig.headers ?? {};
			if (!headers["Content-Type"]) {
				headers["Content-Type"] = "application/json";
			}
			const response = await fetch(process.env.REACT_APP_API_BASEURL + requestConfig.url, {
				method: requestConfig.method ? requestConfig.method : "GET",
				headers: headers,
				body: body,
			});

			if (!response.ok) {
				throw new Error("Request failed!");
			}

			const data = await response.json();
			applyData(data);
		} catch (err) {
			setError(err.message || "Something went wrong!");
		}
		setIsLoading(false);
	}, []);

	return {
		isLoading,
		error,
		sendRequest,
	};
};

export default useHttp;
