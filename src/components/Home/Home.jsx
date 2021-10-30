import React, { useContext, useEffect, useState } from 'react';
import Weather from './Weather';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import OutfitCarousel from './OutfitCarousel';
import useHttp from '../../hooks/use-http';
import AuthContext from '../../contexts/auth-context';
import HomeStatistic from './HomeStatistic';
const Home = () => {
	const [currDate, setCurrDate] = useState(new Date());
	const [outfitsOfTheDay, setOutfitsOfTheDay] = useState([]);
	const [currentOutfitsIndex, setCurrentOutfitsIndex] = useState(0);

	const [statistic, setStatistic] = useState({});

	const { isLoading, error, sendRequest } = useHttp();
	const ctx = useContext(AuthContext);

	useEffect(() => {
		sendRequest(
			{
				url: `outfit/get-by-date/${
					ctx.user.userId
				}/${currDate.toDateString('YYYY-MM-DD')}`,
			},
			(returnData) => {
				if (returnData != null) {
					setOutfitsOfTheDay(returnData);
				}
			}
		);
	}, [currDate]);

	const onChangeHandler = (index) => {
		// console.log(params);
		setCurrentOutfitsIndex(index);
	};

	useEffect(() => {
		const statistic = {
			outfitStatistic:
				outfitsOfTheDay[currentOutfitsIndex]?.outfitStatistic,
			clothingsStatistic:
				outfitsOfTheDay[currentOutfitsIndex]?.clothingsStatistic,
		};
		setStatistic(statistic);
	}, [outfitsOfTheDay, currentOutfitsIndex]);

	return (
		<div className='flex flex-col items-center space-y-4'>
			<div className='font-semibold text-3xl text-gray-700'>
				OUTFIT OF THE DAY
			</div>

			<div className='flex flex-col md:flex-row w-full justify-center items-stretch content-evenly md:space-x-4'>
				<div className='flex flex-col space-y-4 items-stretch md:w-1/3 pr-2'>
					<div>
						<OutfitCarousel
							outfits={outfitsOfTheDay}
							onChange={onChangeHandler}
						/>
					</div>
					{/* <div>
						<hr className='border-yellow-200'/>
					</div> */}
					<div>
						<Weather />
					</div>
				</div>

				{outfitsOfTheDay.length > 0 && (
					<div className='flex flex-col w-full flex-1 space-y-4 md:border-l-2 border-yellow-300 pl-6'>
						<div className='text-center'>
							<HomeStatistic statistic={statistic} />
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Home;
