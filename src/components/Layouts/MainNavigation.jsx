import { useContext } from "react";
import { Link, Route, a, NavLink, useHistory } from "react-router-dom";
import AuthContext from "../../contexts/auth-context";

function MainNavigation() {
	const ctx = useContext(AuthContext);

	const history = useHistory();

	const logoutHandler = () => {
		ctx.onLogout();
		history.push("/");
	};

	const handleNavLinkOnClick = () => {
		document.getElementById("menu-toggle").checked = false;
	};

	return (
		<header className='md:px-16 h-16 md:h-24 px-6 bg-white flex flex-wrap items-center py-4 sticky top-0 shadow-sm z-10'>
			<div className='flex flex-1 lg:flex-none items-center mr-6 pb-2'>
				<NavLink to='/' className='font-bold text-2xl'>
					Kupboard
				</NavLink>
			</div>

			<label htmlFor='menu-toggle' className='pointer-cursor lg:hidden block'>
				<svg className='fill-current text-gray-900' xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'>
					<title>menu</title>
					<path d='M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z'></path>
				</svg>
			</label>
			<input className='hidden' type='checkbox' id='menu-toggle' />

			<div
				className='hidden lg:flex lg:flex-1 lg:flex-row lg:items-center lg:justify-between lg:w-auto lg:relative absolute top-16 md:top-24 lg:top-0 w-full left-0 px-4 pb-4 lg:p-0 bg-white shadow-md lg:shadow-none'
				id='menu'>
				<nav className='flex'>
					<div className='lg:flex items-center justify-between text-base text-gray-700 pt-4 lg:pt-0'>
						<NavLink className='md:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-blue-400' to='/' onClick={handleNavLinkOnClick}>
							Home
						</NavLink>
						<NavLink
							className='md:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-purple-400'
							to='/clothings'
							onClick={handleNavLinkOnClick}>
							Clothings
						</NavLink>
						<NavLink
							className='md:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-teal-400'
							to='/outfits'
							onClick={handleNavLinkOnClick}>
							Outfits
						</NavLink>
						<NavLink
							className='md:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-green-400'
							to='/schedule'
							onClick={handleNavLinkOnClick}>
							Schedule
						</NavLink>
						<NavLink
							className='md:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-green-400'
							to='/chat'
							onClick={handleNavLinkOnClick}>
							Chat
						</NavLink>
					</div>
				</nav>
				<nav className='flex'>
					<div className='md:flex md:space-x-3 items-center justify-between text-base text-gray-700 pt-4 lg:pt-0'>
						{ctx.user != null && (
							<NavLink
								className='md:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-orange-400'
								activeClassName='border-orange-400'
								to='/profile'
								onClick={handleNavLinkOnClick}>
								<img src={ctx.user.photoURL} className='w-10 h-10 rounded-full' alt='' />
							</NavLink>
						)}
						<NavLink className='md:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-orange-400' to='/' onClick={logoutHandler}>
							Log Out
						</NavLink>
					</div>
				</nav>
			</div>
		</header>
	);
}

export default MainNavigation;
