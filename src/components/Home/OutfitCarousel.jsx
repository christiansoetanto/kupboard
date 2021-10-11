import React, { useContext, useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import AuthContext from "../../contexts/auth-context";
import useHttp from "../../hooks/use-http";
import OutfitItem from "../Outfit/OutfitItem";

const OutfitCarousel = (props) => {
	const { outfits, onChange } = props;

	const onChangeHandler = (index) => {
		onChange(index);
	};

	return (
		<div>
			{outfits.length == 0 && (
				<div className='flex flex-col items-center justify-center'>
					<div className='text-lg'>Today's outfit has not been set yet</div>
					<div className='text-md'>pick one from your wardrobe</div>
				</div>
			)}
			{outfits.length > 0 && (
				<Carousel autoplay infiniteLoop={true} onChange={onChangeHandler} showThumbs={false}>
					{outfits.map((e) => {
						return (
							<div className='mb-8' key={e.outfitId}>
								<OutfitItem key={e.outfitId} outfit={e} innerClassName='cursor-pointer hover:bg-yellow-200' />
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
