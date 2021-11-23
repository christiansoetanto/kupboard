import React, { useEffect, useState } from 'react';
import useHttp from '../../hooks/use-http';
const Weather = () => {
	const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY;
	const openWeatherBaseUrl =
		'https://api.openweathermap.org/data/2.5/weather?units=metric&';
	const { isLoading, error, sendRequest, setError } = useHttp();
	//default rumah gw
	const [coordinate, setCoordinate] = useState({
		latitude: '-6',
		longitude: '106',
	});
	const [weatherData, setWeatherData] = useState({
		temperature: '',
		placeName: '',
		countryName: '',
		weather: '',
		iconUrl: '',
		systemRec: '',
	});

	useEffect(() => {
		const processLocation = (position) => {
			setCoordinate({
				latitude: parseInt(position.coords.latitude),
				longitude: parseInt(position.coords.longitude),
			});
		};

		const processError = (error) => {
			switch (error.code) {
				case error.PERMISSION_DENIED:
					setError('User denied the request for Geolocation.');
					break;
				case error.POSITION_UNAVAILABLE:
					setError('Location information is unavailable.');
					break;
				case error.TIMEOUT:
					setError('The request to get user location timed out.');
					break;
				case error.UNKNOWN_ERROR:
					setError('An unknown error occurred.');
					break;
			}
		};

		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				processLocation,
				processError
			);
		} else {
			setError('Geolocation is not supported by this browser.');
		}
	}, []);

	const systemRecGenerator = (weatherId) => {
		const strWeatherId = weatherId.toString();

		if (
			strWeatherId.startsWith('2') ||
			strWeatherId.startsWith('3') ||
			strWeatherId.startsWith('5') ||
			strWeatherId.startsWith('6')
		)
			return 'It looks like it is going to rain, we suggest you to wear something cozy and warm.';

		if (strWeatherId.startsWith('7'))
			return 'The atmosphere today is quite unusual, please wear something to protect yourself.';

		if (strWeatherId == '800')
			return 'Rise and shine! Any outfit you wear should be fine.';

		if (strWeatherId == '801' || strWeatherId == '802')
			return 'Just a little bit cloudy, any outfit you wear should be fine.';

		if (strWeatherId == '803' || strWeatherId == '804')
			return 'Too cloudy today, we suggest you to prepare for unexpected rain.';
	};

	useEffect(() => {
		const url = `${openWeatherBaseUrl}lat=${coordinate.latitude}&lon=${coordinate.longitude}&appid=${apiKey}`;
		const corsUrl = `https://cors-anywhere.herokuapp.com/${url}`;
		const apiUrl = `weatherforecast/${coordinate.latitude}/${coordinate.longitude}`;
		sendRequest({ url: apiUrl, dontShowError: true }, (returnData) => {
			setWeatherData({
				temperature: returnData.main.temp ?? '',
				placeName: returnData.name ?? '',
				countryName: returnData.sys?.country ?? '',
				weather: returnData.weather[0]?.main ?? '',
				iconUrl: `http://openweathermap.org/img/wn/${returnData.weather[0]?.icon}@2x.png`,
				// weatherId: returnData.weather[0]?.id,
				systemRec: systemRecGenerator(returnData.weather[0]?.id),
			});
		});
	}, [coordinate]);
	return (
		<div>
			{/* <div>
				latitude = {coordinate.latitude} <br></br>
				longitude = {coordinate.longitude}
			</div> */}
			{/* <div>
				temperature = {weatherData.temperature}
				<br />
				placeName = {weatherData.placeName}
				<br />
				countryName = {weatherData.countryName}
				<br />
				<img src={weatherData.iconUrl} alt="" />
			</div> */}
			{!error && !isLoading && (
				<div className='rounded-lg border-amber-300 bg-white border-2 pt-1 px-4'>
					<div className='flex flex-row items-center md:space-x-4'>
						<div className='flex flex-col text-center'>
							<div className='font-semibold  md:text-xl'>
								{weatherData.placeName},{' '}
								{weatherData.countryName}
							</div>
							<div className='flex flex-row items-center'>
								<div>
									<img src={weatherData.iconUrl} alt='' />
								</div>
								<div className='md:text-2xl'>
									{weatherData.temperature}&#8451;
								</div>
							</div>
						</div>

						<div className='md:text-lg'>
							<div className='ml-12 md:ml-24'>{weatherData.systemRec}</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Weather;
