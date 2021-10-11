import React, { useContext, useEffect, useState } from "react";
import Weather from "./Weather";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import OutfitCarousel from "./OutfitCarousel";
import useHttp from "../../hooks/use-http";
import AuthContext from "../../contexts/auth-context";
import { Carousel } from "react-responsive-carousel";
import ClothingStatisticDetail from "../Clothing/ClothingStatisticDetail";
import OutfitStatisticDetail from "../Outfit/OutfitStatisticDetail";
const HomeStatistic = (props) => {
	const { outfitStatistic, clothingsStatistic } = props.statistic;

	return (
		<div className='flex flex-col items-center space-y-4'>
			<div className='bg-red-500 m-3 p-3'>{outfitStatistic && <OutfitStatisticDetail statistic={outfitStatistic} />}</div>
			<div className='bg-blue-500 m-3 p-3'>
				{clothingsStatistic && clothingsStatistic.length > 0 && (
					<Carousel autoplay infiniteLoop={true} showThumbs={false}>
						{clothingsStatistic.map((e, i) => {
							return (
								<div className='mb-8' key={i}>
									<ClothingStatisticDetail statistic={e} />
								</div>
							);
						})}
					</Carousel>
				)}
			</div>
		</div>
	);
};

export default HomeStatistic;
