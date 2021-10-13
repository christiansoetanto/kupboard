import React, { useRef, useState, useEffect, useContext } from 'react';
import useHttp from '../../hooks/use-http';
import AuthContext from '../../contexts/auth-context';
const ClothingStatisticDetail = (props) => {
	const { statistic } = props;
	return (
		<div name='desc' className='flex items-center justify-around space-y-2 md:space-y-0 md:space-x-2 px-5 flex-col md:flex-row '>
			{statistic.clothingImageUrl && (
				<div className='flex-1'>
					<img
						src={statistic.clothingImageUrl}
						className='max-h-72 w-1/2 md:w-auto'
						alt=''
					/>
				</div>
			)}
			<div className='flex flex-col text-left text-gray-700 space-y-1 w-ful md:w-1/2'>
				<div className='rounded-md py-2 px-4 shadow-lg bg-blue-100'>Last used on <span className='font-semibold'>{statistic.lastUsedDate}</span></div>
				<div className='rounded-md py-2 px-4 shadow-lg bg-green-100'>You also scheduled this clothing on <span className='font-semibold'>{statistic.nextUseDate}</span></div>
				<div className='rounded-md py-2 px-4 shadow-lg bg-yellow-100'>You have worn this clothing <span className='font-semibold'>{statistic.usedCount} time{statistic.usedCount > 1 && "s" }</span></div>
				<div className='rounded-md py-2 px-4 shadow-lg bg-orange-100'>You have scheduled this clothing for <span className='font-semibold'>{statistic.plannedToUseCount} more time{statistic.plannedToUseCount > 1 && "s"}</span></div>
				<div className='rounded-md py-2 px-4 shadow-lg bg-red-100'>You have this clothing in <span className='font-semibold'>{statistic.includedInOutfitCount} outfit{statistic.includedInOutfitCount > 1 && "s"}</span></div>
				<div className='rounded-md py-2 px-4 shadow-lg bg-purple-100'>You uploaded this clothing on <span className='font-semibold'>{statistic.insertDate}</span></div>
			</div>
		</div>
	);
};

export default ClothingStatisticDetail;
