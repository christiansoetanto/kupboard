import { useState, useCallback } from "react";
import { confirmAlert } from "react-confirm-alert";

const useHttp = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const sendRequest = useCallback(async (requestConfig, applyData) => {
		setIsLoading(true);
		setError(null);
		try {
			const isJson = requestConfig.isJson ?? true;
			const useAPIBaseUrl = requestConfig.useAPIBaseUrl ?? true;
			const url = useAPIBaseUrl ? process.env.REACT_APP_API_BASEURL + requestConfig.url : requestConfig.url;
			const body = requestConfig.body ? (isJson ? JSON.stringify(requestConfig.body) : requestConfig.body) : null;
			let headers = requestConfig.headers ?? {};
			if (!headers["Content-Type"]) {
				headers["Content-Type"] = "application/json";
			}
			// headers["Access-Control-Allow-Origin"] = "*";
			// headers["Access-Control-Allow-Headers"] = "Origin, X-Requested-With, Content-Type, Accept	";
			const response = await fetch(url, {
				method: requestConfig.method ? requestConfig.method : "GET",
				headers: headers,
				body: body,
			});

			if (!response.ok) {
				throw new Error("Request failed!");
			}

			const data = await response.json();

			await applyData(data);
		} catch (err) {
			setError(err.message || "Something went wrong!");
		}
		setIsLoading(false);
	}, []);

	return {
		isLoading,
		error,
		sendRequest,
		setError,
	};
};

export default useHttp;
