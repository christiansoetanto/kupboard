import React, { Fragment } from "react";
import ReactTooltip from "react-tooltip";
import PrimaryClothingImages from "../Outfit/PrimaryClothingImages";
const ScheduleOutfitItem = (props) => {
	const { outfitId, outfitName, clothings } = props;
	const tooltip_id = `tooltip_${outfitName}`;

	return (
		<Fragment>
			<a data-tip data-for={tooltip_id}>
				<div className='bg-green-500 m-2 whitespace-nowrap overflow-hidden overflow-ellipsis'>{outfitName}</div>
			</a>
			<ReactTooltip id={tooltip_id} type='light' effect='solid'>
				<div>{outfitName}</div>
				<div>
					<PrimaryClothingImages
						key={tooltip_id}
						hat={clothings.filter((e) => e.category.categoryId == 3)[0]?.imageUrl}
						shirt={clothings.filter((e) => e.category.categoryId == 2)[0]?.imageUrl}
						pants={clothings.filter((e) => e.category.categoryId == 1)[0]?.imageUrl}
						footwear={clothings.filter((e) => e.category.categoryId == 4)[0]?.imageUrl}
					/>
				</div>
			</ReactTooltip>
		</Fragment>
	);
};

export default ScheduleOutfitItem;
