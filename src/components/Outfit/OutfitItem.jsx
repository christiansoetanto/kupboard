import React from 'react';
import Card from '../UI/Card';
const OutfitItem = (props) => {
	// const { imageUrl, name, tags, category } = props.outfit;
	const { clothings, tags, outfitId } = props.outfit;
	return (
		<div className='rounded shadow-xl bg-white border p-1'>
			<div className='flex items-center justify-center'>
				<div style={{ maxWidth: '13rem' }} className='flex flex-col space-y-1 items-center justify-start'>
					{clothings.map((e) => (
						<img src={e.imageUrl} style={{maxHeight:'15rem'}} />
					))}
				</div>
			</div>
			{/* <div id='description'>
				hello, id={outfitId}, clothings = {clothings.map((e) => e.name + "; ")}, tags = {tags.map((e) => e.name + "; ")}
			</div> */}
		</div>
	);
};

export default OutfitItem;
