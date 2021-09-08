import "./App.css";
import Clothings from "./components/Clothing/Clothings";
import AddClothing from "./components/Clothing/AddClothing";
import AddOutfit from "./pages/AddOutfit";
import Outfits from "./pages/Outfits";
import { Route, Switch } from "react-router-dom";
import Layout from "./components/Layouts/Layout";
import Login from "./pages/Login";

import ClothingDetail from "./components/Clothing/ClothingDetail";
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

				<Route path='/outfits' exact>
					<Outfits />
				</Route>
				<Route path='/add-outfits' exact>
					<AddOutfit />
				</Route>

				<Route path='/' exact>
					<div>ini halaman home hehe</div>
				</Route>

				<Route path='/clothings/:id'>
					<ClothingDetail />
				</Route>

				<Route path='/login' exact>
					<Login />
				</Route>
			</Switch>
		</Layout>
	);
}

export default App;
