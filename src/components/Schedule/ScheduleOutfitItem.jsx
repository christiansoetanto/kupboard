import React, { Fragment } from 'react';
import ReactTooltip from 'react-tooltip';
import PrimaryClothingImages from '../Outfit/PrimaryClothingImages';
const ScheduleOutfitItem = (props) => {
	const { outfitId, outfitName, clothings } = props;
	const tooltip_id = `tooltip_${outfitId}`;

	return (
		<Fragment>
			<a data-tip data-for={tooltip_id}>
				<div className='bg-green-500 m-2 whitespace-nowrap overflow-hidden overflow-ellipsis'>
					{outfitName}
				</div>
			</a>
			<ReactTooltip id={tooltip_id} type='light' effect='solid'>
				<div>{outfitName}</div>
				<div>
					<PrimaryClothingImages clothings={clothings} />
				</div>
			</ReactTooltip>
		</Fragment>
	);
};

export default ScheduleOutfitItem;
