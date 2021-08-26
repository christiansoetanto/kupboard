import { Link, Route } from "react-router-dom";

function MainNavigation() {
	return (
		<header className='w-screen h-20 flex-1 items-center justify-between bg-red p-1'>
			<div>Kupboard</div>
			<nav>
				<ul>
					<li>
						<Link to='/'>Home</Link>
					</li>
					<li>
						<Link to='/clothings'>Clothings</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
}

export default MainNavigation;
