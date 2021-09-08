import { useContext } from 'react';
import AuthContext from '../../contexts/auth-context';
import MainNavigation from './MainNavigation';
import Login from '../../pages/Login';

function Layout(props) {
	const ctx = useContext(AuthContext);

	return (
		<div>
			{ctx.isLoggedIn && ctx.user && (
				<div>
					<MainNavigation />
					<main className='p-2 md:mx-36'>{props.children}</main>
				</div>
			)}

			{!ctx.isLoggedIn && <Login />}
		</div>
	);
}

export default Layout;
