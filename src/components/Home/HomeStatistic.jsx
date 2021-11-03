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
		<div className='flex flex-col space-y-2 justify-center items-stretch text-sm'>
			{outfitStatistic && (
				<div className='bg-white shadow-xl border p-3 rounded-lg '>
					<div className='text-xl mb-4'>
						Outfit Statistics
						<hr />
					</div>
					<OutfitStatisticDetail statistic={outfitStatistic} />
				</div>
			)}
			{clothingsStatistic && clothingsStatistic.length > 0 && (
				<div className='bg-white shadow-xl border p-3 rounded-lg'>
					<div className='text-xl mb-4'>
						Clothing Statistics
						<hr />
					</div>
					{/* {clothingsStatistic && clothingsStatistic.length > 0 && ( */}
					<Carousel autoPlay={true} infiniteLoop={true} showThumbs={false} dynamicHeight={false} interval={7000} showStatus={false}>
						{clothingsStatistic.map((e, i) => {
							return (
								// <div className='mb-8 flex items-center justify-center' key={i}>
								<ClothingStatisticDetail statistic={e} key={i} isShowPicture={true} />
								// </div>
							);
						})}
					</Carousel>
				</div>
			)}
		</div>
	);
};

export default HomeStatistic;
