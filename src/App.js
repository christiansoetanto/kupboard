import "./App.css";
import Clothings from "./pages/Clothings";
import AddClothing from "./pages/AddClothing";
import { Route, Switch } from "react-router-dom";

import Layout from "./components/Layouts/Layout";

function App() {
	return (
		<Layout>
			<Switch>
				<Route path='/clothings' exact>
					<Clothings />
				</Route>
				<Route path='/add-clothing' exact>
					<AddClothing />
				</Route>
				<Route path='/' exact>
					<div>ini halaman home hehe {process.env.REACT_APP_API_BASEURL}</div>
				</Route>
			</Switch>
		</Layout>
	);
}

export default App;
