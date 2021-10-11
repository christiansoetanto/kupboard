import React, { useRef, useState, useEffect, useContext } from "react";
import useHttp from "../../hooks/use-http";
import AuthContext from "../../contexts/auth-context";
const ClothingStatisticDetail = (props) => {
	const { statistic } = props;
	return (
		<div name='desc'>
			<ul>
				<li>lastUsedDate = {statistic.lastUsedDate}</li>
				<li>nextUseDate = {statistic.nextUseDate}</li>
				<li>usedCount = {statistic.usedCount}</li>
				<li>plannedToUseCount = {statistic.plannedToUseCount}</li>
				<li>includedInOutfitCount = {statistic.includedInOutfitCount}</li>
				<li>insertDate = {statistic.insertDate}</li>
			</ul>
		</div>
	);
};

export default ClothingStatisticDetail;
