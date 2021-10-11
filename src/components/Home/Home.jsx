import React from 'react';
import Weather from './Weather';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import OutfitCarousel from './OutfitCarousel';

const Home = () => {
	return (
		<div className='flex flex-col items-center space-y-4'>
			<div className='font-semibold text-3xl text-gray-700'>
				OUTFIT OF THE DAY
			</div>

			<div className='flex flex-col md:flex-row w-full justify-center items-center content-evenly md:space-x-4'>
				<div className='flex-1 text-center flex flex-col items-stretch md:w-1/3 md:border-r-2 border-warmGray-300 md:pr-8'>
					<div className='w-full'>
						<OutfitCarousel />
					</div>
				</div>
				<div className='flex flex-col w-full flex-1 space-y-4'>
					<Weather />
					<div className='text-center bg-yellow-100 py-2 px-4'>
						ini statistic
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
