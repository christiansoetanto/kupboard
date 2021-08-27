import MainNavigation from "./MainNavigation";

function Layout(props) {
	return (
		<div>
			<MainNavigation />
			<main className='p-2'>{props.children}</main>
		</div>
	);
}

export default Layout;
