import React from "react";
import "./PunyaCS.css";
const PunyaCS = () => {
	return (
		<div className='border-2 align-middle'>
			<div className='flex-col'>
				<div id='div-campus'>
					<div className='text-lg border-l-2 border-blue-800 pl-2'>Campuses </div>
					<div className='inline-block m-1 p-0 pb-5  bg-gray-200 flex-col items-center  overflow-hidden bg-contain'>
						<div id='campus-img'>
							<img
								id='campus-img-item'
								src='https://global.binus.ac.id/files/2021/05/BInus-Anggrek.jpg'
								alt='@Model.Result.CampusLocationName'
								className='h-auto m-0 p-0 object-contain'
							/>
						</div>
						<div className='campus-name'>name</div>
					</div>
				</div>
				<div className='divider mt-5 mb-5'></div>
				<div id='div-program'>
					<div className='result-title'>
						<span className='pl-5'>Program</span>
					</div>
					<div className='result-box bg-white'>
						<div className='program-name'>programname</div>
					</div>
					<div className='divider my-5'>program </div>
					<div>
						<div className='grid grid-flow-row p-0 grid-cols-3'>
							{[1, 2, 3, 4, 5, 6].map((element) => {
								return (
									<div className=' inline-block m-1 p-0  bg-gray-200 flex-col w-1/4 overflow-hidden bg-contain'>
										<img
											src='https://global.binus.ac.id/files/2021/05/BInus-Anggrek.jpg'
											alt=''
											className='h-auto m-0 p-0 object-contain'
										/>
										<div className='px-1 m-0'>asdasdasd</div>
									</div>
								);
							})}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PunyaCS;
