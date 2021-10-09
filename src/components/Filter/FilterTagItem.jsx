import React, { useState } from "react";
import Card from "../UI/Card";
const FilterTagItem = (props) => {
	const { tagId, color, name, isSelected, onClickTag } = props;
	const clickTagHandler = (e) => {
		onClickTag({ tagId: tagId, name: name, isSelected: !isSelected });
	};
	return (
		<Card
			className={`flex content-start justify-between whitespace-nowrap rounded-full py-1 px-4 cursor-pointer ${
				isSelected && "bg-orange-400 text-white"
			}`}>
			<div style={{ backgroundColor: { color } }} className={`h-full self-center flex-shrink rounded-full`}>
				<div className={`flex flex-nowrap space-x-1 `}>
					<div className=' flex items-center' type='text' onClick={clickTagHandler}>
						<div className={`rounded-full overflow-hidden w-6 h-6 mr-1 border border-gray-900`}>
							<input
								type='color'
								value={color}
								disabled={true}
								className='bg-transparent h-52 w-52 p-0 border-0 cursor-pointer'
								style={{
									transform: "translate(-25%, -25%)",
								}}
							/>
						</div>
						<div>{name}</div>
					</div>
				</div>
			</div>
		</Card>
	);
};

export default FilterTagItem;
