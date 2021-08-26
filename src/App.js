import "./App.css";
import Clothings from "./components/Clothing/Clothings";

import { Route, Switch } from "react-router-dom";

import Layout from "./components/Layouts/Layout";

function App() {
	return (
		<Layout>
			<Switch>
				<Route path='/clothings' exact>
					<Clothings />
				</Route>
				<Route path='/' exact>
					<div>ini halaman home hehe</div>
				</Route>
			</Switch>
		</Layout>
	);
}

export default App;
