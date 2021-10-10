import React, { useEffect, useState } from "react";
import useHttp from "../../hooks/use-http";
const Weather = () => {
	const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY;
	const openWeatherBaseUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&";
	const { isLoading, error, sendRequest, setError } = useHttp();
	//default rumah gw
	const [coordinate, setCoordinate] = useState({ latitude: "-6", longitude: "106" });
	const [weatherData, setWeatherData] = useState({
		temperature: "",
		placeName: "",
		countryName: "",
		weather: "",
	});

	useEffect(() => {
		const processLocation = (position) => {
			setCoordinate({ latitude: parseInt(position.coords.latitude), longitude: parseInt(position.coords.longitude) });
		};

		const processError = (error) => {
			switch (error.code) {
				case error.PERMISSION_DENIED:
					setError("User denied the request for Geolocation.");
					break;
				case error.POSITION_UNAVAILABLE:
					setError("Location information is unavailable.");
					break;
				case error.TIMEOUT:
					setError("The request to get user location timed out.");
					break;
				case error.UNKNOWN_ERROR:
					setError("An unknown error occurred.");
					break;
			}
		};

		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(processLocation, processError);
		} else {
			setError("Geolocation is not supported by this browser.");
		}
	}, []);
	useEffect(() => {
		const url = `${openWeatherBaseUrl}lat=${coordinate.latitude}&lon=${coordinate.longitude}&appid=${apiKey}`;
		const corsUrl = `https://cors-anywhere.herokuapp.com/${url}`;

		sendRequest({ url: corsUrl, useAPIBaseUrl: false }, (returnData) => {
			console.log(returnData);
			setWeatherData({
				temperature: returnData.main.temp ?? "",
				placeName: returnData.name ?? "",
				countryName: returnData.sys?.country ?? "",
				weather: returnData.weather?.main ?? "",
			});
		});
	}, [coordinate]);
	return (
		<div className='rounded-lg bg-yellow-200 py-2 px-4'>
			<div>
				latitude = {coordinate.latitude} <br></br>
				longitude = {coordinate.longitude}
			</div>
			<div>
				temperature = {weatherData.temperature} <br></br>
				placeName = {weatherData.placeName} <br></br>
				countryName = {weatherData.countryName} <br></br>
				weather = {weatherData.weather} <br></br>
			</div>
			<div>error = {error}</div>
		</div>
	);
};

export default Weather;
