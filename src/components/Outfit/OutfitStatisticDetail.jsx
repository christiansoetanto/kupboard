import React from "react";

const OutfitStatisticDetail = (props) => {
	const { statistic } = props;
	return (
		<div name='desc'>
			<ul>
				<li>lastUsedDate = {statistic.lastUsedDate}</li>
				<li>nextUseDate = {statistic.nextUseDate}</li>
				<li>usedCount = {statistic.usedCount}</li>
				<li>plannedToUseCount = {statistic.plannedToUseCount}</li>
				<li>insertDate = {statistic.insertDate}</li>
			</ul>
		</div>
	);
};

export default OutfitStatisticDetail;
