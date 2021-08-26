import MainNavigation from "./MainNavigation";

function Layout(props) {
	return (
		<div>
			<MainNavigation />
			<main className='m-1 w-11/12 max-w-2xl'>{props.children}</main>
		</div>
	);
}

export default Layout;
