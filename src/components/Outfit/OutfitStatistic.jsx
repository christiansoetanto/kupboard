import React, { useRef, useState, useEffect, useContext } from "react";
import useHttp from "../../hooks/use-http";
import AuthContext from "../../contexts/auth-context";
import OutfitStatisticDetail from "./OutfitStatisticDetail";
const OutfitStatistic = (props) => {
	const { isLoading, error, sendRequest } = useHttp();
	const ctx = useContext(AuthContext);

	const [statistic, setStatistic] = useState(null);
	const { id } = props;

	useEffect(() => {
		sendRequest({ url: `statistic/outfit/${ctx.user.userId}/${id}` }, (returnData) => {
			setStatistic(returnData);
		});
	}, []);

	return (
		<div className='w-full pb-4 rounded bg-orange-100 flex flex-col items-center justify-start pt-2'>
			<div className='text-2xl my-2 font-semibold' name='title'>
				About this outfit
			</div>

			{statistic && <OutfitStatisticDetail statistic={statistic} />}
		</div>
	);
};

export default OutfitStatistic;
