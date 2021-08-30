import { useState, useCallback } from "react";

const useHttp = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const sendRequest = useCallback(async (requestConfig, applyData) => {
		setIsLoading(true);
		setError(null);
		try {
			requestConfig.isJson = requestConfig.isJson ?? true;
			const response = await fetch(process.env.REACT_APP_API_BASEURL + requestConfig.url, {
				method: requestConfig.method ? requestConfig.method : "GET",
				headers: requestConfig.headers ? requestConfig.headers : {},
				body: requestConfig.body ? (requestConfig.isJson ? JSON.stringify(requestConfig.body) : requestConfig.body) : null,
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
