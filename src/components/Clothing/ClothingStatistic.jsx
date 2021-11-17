import React, { useRef, useState, useEffect, useContext } from "react";
import useHttp from "../../hooks/use-http";
import AuthContext from "../../contexts/auth-context";
import ClothingStatisticDetail from "./ClothingStatisticDetail";
const ClothingStatistic = (props) => {
	const { isLoading, error, sendRequest } = useHttp();
	const ctx = useContext(AuthContext);

	const [statistic, setStatistic] = useState(null);
	const { id } = props;

	useEffect(() => {
		sendRequest({ url: `statistic/clothing/${ctx.user.userId}/${id}` }, (returnData) => {
			setStatistic(returnData);
		});
	}, []);

	return (
		<div className='w-full rounded bg-orange-100 flex flex-col items-center justify-start pt-2 pb-4'>
			<div className='text-4xl font-semibold' name='title'>
				Statistics
			</div>

			{statistic && <ClothingStatisticDetail statistic={statistic} />}
		</div>
	);
};

export default ClothingStatistic;
