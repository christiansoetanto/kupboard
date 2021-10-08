import React, { useRef, useState, useEffect, useContext } from "react";
import useHttp from "../../hooks/use-http";
import AuthContext from "../../contexts/auth-context";
const Statistic = (props) => {
	const { isLoading, error, sendRequest } = useHttp();
	const ctx = useContext(AuthContext);

	const { type, id } = props;

	useEffect(() => {
		sendRequest({ url: `statistic/${type}/${ctx.user.userId}/${id}` }, (returnData) => {
			console.log(returnData);
		});
	}, []);

	return (
		<div className='w-full rounded bg-orange-100 flex flex-col items-center justify-start pt-2'>
			<div className='text-4xl font-semibold' name='title'>
				Statistics
			</div>

			<div name='desc'>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, odit labore ducimus laboriosam magnam nesciunt numquam amet expedita
					enim excepturi nobis corporis suscipit sint voluptatem ullam, pariatur quia dolor quo!
				</p>
			</div>
		</div>
	);
};

export default Statistic;
