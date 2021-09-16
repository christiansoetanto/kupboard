import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import Card from "../UI/Card";
const OutfitItem = (props) => {
	const history = useHistory();

	const { clothings, tags, outfitId } = props.outfit;
	const [hat, setHat] = useState("https://img.icons8.com/dotty/80/000000/trilby.png");
	const [shirt, setShirt] = useState(
		"https://img.icons8.com/external-kiranshastry-lineal-kiranshastry/64/000000/external-shirt-hygiene-kiranshastry-lineal-kiranshastry-2.png"
	);
	const [pants, setPants] = useState(
		"https://img.icons8.com/external-vitaliy-gorbachev-lineal-vitaly-gorbachev/60/000000/external-pants-clothes-vitaliy-gorbachev-lineal-vitaly-gorbachev-1.png"
	);
	const [footwear, setFootwear] = useState("https://img.icons8.com/ios/50/000000/mens-shoe.png");

	const handleCardClick = () => {
		history.push(`/outfits/${outfitId}`);
	};
	useEffect(() => {
		const hat = clothings.filter((e) => e.category.categoryId == 3);
		hat.length == 1 && setHat(hat[0].imageUrl);

		const shirt = clothings.filter((e) => e.category.categoryId == 2);
		shirt.length == 1 && setShirt(shirt[0].imageUrl);

		const pants = clothings.filter((e) => e.category.categoryId == 1);
		pants.length == 1 && setPants(pants[0].imageUrl);

		const footwear = clothings.filter((e) => e.category.categoryId == 4);
		footwear.length == 1 && setFootwear(footwear[0].imageUrl);
	}, []);

	return (
		<div className='rounded shadow-xl bg-white border p-1' onClick={handleCardClick}>
			<div className='flex items-center justify-center'>
				<div style={{ maxWidth: "13rem" }} className='flex flex-col space-y-1 items-center justify-center'>

					<img
						src={hat}
						alt='asd'
						className='w-16 h-16'
						// style={{ maxHeight: '15rem' }}
					/>
					<img
						src={shirt}
						alt='sdg'
						className='w-28 h-28'
						// style={{ maxHeight: '15rem' }}
					/>
					<img
						src={pants}
						alt='fgh'
						className='w-20 h-36'
						// style={{ maxHeight: '15rem' }}
					/>
					<img src={footwear} alt='jkl' className='w-14 h-14' style={{ maxHeight: "15rem" }} />
				</div>
			</div>
		</div>
	);
};

export default OutfitItem;
