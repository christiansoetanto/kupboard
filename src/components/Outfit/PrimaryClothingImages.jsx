import React from "react";

const PrimaryClothingImages = (props) => {
	let { hat, shirt, pants, footwear } = props;
	hat = hat ?? "https://img.icons8.com/dotty/80/000000/trilby.png";
	shirt = shirt ?? "https://img.icons8.com/external-kiranshastry-lineal-kiranshastry/64/000000/external-shirt-hygiene-kiranshastry-lineal-kiranshastry-2.png";

	pants =
		pants ??
		"https://img.icons8.com/external-vitaliy-gorbachev-lineal-vitaly-gorbachev/60/000000/external-pants-clothes-vitaliy-gorbachev-lineal-vitaly-gorbachev-1.png";
	footwear = footwear ?? "https://img.icons8.com/ios/50/000000/mens-shoe.png";

	return (
		<div>
			<img src={hat} alt='asd' className='w-16' style={{ maxHeight: "15rem" }} />
			<img src={shirt} alt='sdg' className='w-28' style={{ maxHeight: "15rem" }} />
			<img src={pants} alt='fgh' className='w-20' style={{ maxHeight: "15rem" }} />
			<img src={footwear} alt='jkl' className='w-14' style={{ maxHeight: "15rem" }} />
		</div>
	);
};

export default PrimaryClothingImages;
