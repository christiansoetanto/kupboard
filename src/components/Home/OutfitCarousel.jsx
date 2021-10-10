import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import OutfitItem from '../Schedule/OutfitItem';

const OutfitCarousel = () => {
	return (
		<Carousel autoplay infiniteLoop={true}>
			<div>
				<img
					alt=''
					src='http://lorempixel.com/output/cats-q-c-640-480-1.jpg'
				/>
				<p className='legend'>Legend 1</p>
			</div>
			<div>
				<img
					alt=''
					src='http://lorempixel.com/output/cats-q-c-640-480-2.jpg'
				/>
				<p className='legend'>Legend 2</p>
			</div>
			
		</Carousel>
	);
};

export default OutfitCarousel;
