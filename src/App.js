import './App.css';
import Clothings from './components/Clothing/Clothings';
import AddClothing from './components/Clothing/AddClothing';
import AddOutfit from './components/Outfit/AddOutfit';
import Outfits from './components/Outfit/Outfits';
import { Route, Switch, Redirect } from 'react-router-dom';
import Layout from './components/Layouts/Layout';
import Login from './components/Login/Login';
import ClothingDetail from './components/Clothing/ClothingDetail';
import OutfitDetail from './components/Outfit/OutfitDetail';
import Schedule from './components/Schedule/Schedule';
import Profile from './components/Profile/Profile';
import Home from './components/Home/Home';
import ChatPage from './components/Chat/ChatPage';
import RequestAdvisor from './components/Advisor/RequestAdvisor';
import ApproveRequest from './components/Advisor/ApproveRequest';
import PunyaCS from "./components/PunyaCS";
function App() {
	return (
		// <PunyaCS />
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
				<Route path='/add-outfit' exact>
					<AddOutfit />
				</Route>

				<Route path='/' exact render={() => (<Redirect to='/home' />)} />

				<Route path='/home' exact>
					<Home />
				</Route>

				<Route path='/chat' exact>
					<ChatPage />
				</Route>

				<Route path='/clothings/:id'>
					<ClothingDetail />
				</Route>

				<Route path='/outfits/:id'>
					<OutfitDetail />
				</Route>

				<Route path='/schedule/'>
					<Schedule />
				</Route>
				<Route path='/login' exact>
					<Login />
				</Route>

				<Route path='/profile' exact>
					<Profile />
				</Route>
				<Route path='/request-advisor' exact>
					<RequestAdvisor />
				</Route>
				<Route path='/approve-request' exact>
					<ApproveRequest />
				</Route>
			</Switch>
		</Layout>
	);
}

export default App;
