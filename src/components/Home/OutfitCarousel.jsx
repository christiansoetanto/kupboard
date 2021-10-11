import React, { useContext, useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import AuthContext from '../../contexts/auth-context';
import useHttp from '../../hooks/use-http';
import OutfitItem from '../Outfit/OutfitItem';

const OutfitCarousel = (props) => {
	const [currDate, setCurrDate] = useState(new Date());
	const [outfitOfTheDay, setOutfitOfTheDay] = useState([]);

	const { isLoading, error, sendRequest } = useHttp();
	const ctx = useContext(AuthContext);

	useEffect(() => {
		console.log(currDate);

		sendRequest(
			{
				url: `outfit/get-by-date/${
					ctx.user.userId
				}/${currDate.toDateString('YYYY-MM-DD')}`,
			},
			(returnData) => {
				if (returnData != null) {
					setOutfitOfTheDay(returnData);
					console.log(returnData);
				}
			}
		);
	}, [currDate]);

	return (
		<div>
			{outfitOfTheDay.length == 0 && (
				<div className='flex flex-col items-center justify-center'>
					<div className='text-lg'>
						Today's outfit has not been set yet
					</div>
					<div className='text-md'>pick one from your wardrobe</div>
				</div>
			)}
			{outfitOfTheDay.length > 0 && (
				<Carousel autoplay infiniteLoop={true}>
					{outfitOfTheDay.map((e) => {
						return (
							<div className='mb-8'>
								<OutfitItem key={e.outfitId} outfit={e} innerClassName='cursor-pointer hover:bg-yellow-200'/>
								{/* <p className='legend'>{e.name}</p> */}
							</div>
						);
					})}
				</Carousel>
			)}
		</div>
	);
};

export default OutfitCarousel;
