import React from "react";

const OutfitStatisticDetail = (props) => {
	const { statistic } = props;
	return (
		<div name='desc' className='flex items-center justify-around space-y-2 md:space-y-0 md:space-x-2 px-5 flex-col md:flex-row '>
			<div className='flex flex-col text-left text-gray-700 space-y-1 w-full'>
				<div className='rounded-md py-2 px-4 shadow-lg bg-blue-100'>Last used on <span className='font-semibold'>{statistic.lastUsedDate}</span></div>
					<div className='rounded-md py-2 px-4 shadow-lg bg-green-100'>You also scheduled this clothing on <span className='font-semibold'>{statistic.nextUseDate}</span></div>
					<div className='rounded-md py-2 px-4 shadow-lg bg-yellow-100'>You have worn this clothing <span className='font-semibold'>{statistic.usedCount} time{statistic.usedCount > 1 && "s" }</span></div>
					<div className='rounded-md py-2 px-4 shadow-lg bg-orange-100'>You have scheduled this clothing for <span className='font-semibold'>{statistic.plannedToUseCount} more time{statistic.plannedToUseCount > 1 && "s"}</span></div>
					{/* <div className='rounded-md py-2 px-4 shadow-lg bg-red-100'>You have this clothing in <span className='font-semibold'>{statistic.includedInOutfitCount} outfit{statistic.includedInOutfitCount > 1 && "s"}</span></div> */}
					<div className='rounded-md py-2 px-4 shadow-lg bg-purple-100'>You uploaded this clothing on <span className='font-semibold'>{statistic.insertDate}</span></div>
			</div>
		</div>
		// <div name='desc'>
		// 	<ul>
		// 		<li>lastUsedDate = {statistic.lastUsedDate}</li>
		// 		<li>nextUseDate = {statistic.nextUseDate}</li>
		// 		<li>usedCount = {statistic.usedCount}</li>
		// 		<li>plannedToUseCount = {statistic.plannedToUseCount}</li>
		// 		<li>insertDate = {statistic.insertDate}</li>
		// 	</ul>
		// </div>
	);
};

export default OutfitStatisticDetail;
