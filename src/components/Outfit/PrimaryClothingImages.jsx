import React from "react";

const PrimaryClothingImages = (props) => {
	const { clothings } = props;
	const hat = clothings.filter((e) => e.category.categoryId == 3)[0]?.imageUrl ?? "https://img.icons8.com/dotty/80/000000/trilby.png";
	const shirt =
		clothings.filter((e) => e.category.categoryId == 2)[0]?.imageUrl ??
		"https://img.icons8.com/external-kiranshastry-lineal-kiranshastry/64/000000/external-shirt-hygiene-kiranshastry-lineal-kiranshastry-2.png";
	const pants =
		clothings.filter((e) => e.category.categoryId == 1)[0]?.imageUrl ??
		"https://img.icons8.com/external-vitaliy-gorbachev-lineal-vitaly-gorbachev/60/000000/external-pants-clothes-vitaliy-gorbachev-lineal-vitaly-gorbachev-1.png";
	const footwear = clothings.filter((e) => e.category.categoryId == 4)[0]?.imageUrl ?? "https://img.icons8.com/ios/50/000000/mens-shoe.png";

	return (
		<div className='flex flex-col items-center justify-start'>
			<img src={hat} alt='asd' className='w-16' style={{ maxHeight: "15rem" }} />
			<img src={shirt} alt='sdg' className='w-28' style={{ maxHeight: "15rem" }} />
			<img src={pants} alt='fgh' className='w-24' style={{ maxHeight: "15rem" }} />
			<img src={footwear} alt='jkl' className='w-16' style={{ maxHeight: "15rem" }} />
		</div>
	);
};

export default PrimaryClothingImages;
