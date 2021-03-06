import React from "react";
import CancelSvg from "./CancelSvg";

const CallbackAlert = (props) => {
	let msg = "";
	if (props.customMessage) msg = props.customMessage;
	else props.status == "Success" ? (msg = "Success") : (msg = "Something went wrong");
	return (
		<div className='relative bg-white rounded border border-gray-900 py-2 px-4'>
			<div className='justify-between items-center mb-8 border-b-2 border-gray-200'>
				<div className='hover:text-gray-500 cursor-pointer text-right' onClick={props.onClose}>
					<CancelSvg />
				</div>
				<br />
				<div className='text-2xl font-semibold '>{msg}</div>
			</div>
		</div>
	);
};

export default CallbackAlert;
