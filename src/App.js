import React, { useState } from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
} from 'react-router-dom';

import './App.css';

import Home from './pages/Home';
import Mint from './pages/Mint';
import Gallery from './pages/Gallery';
import MyTokens from './pages/MyTokens';

import Login from './components/Login';

function App() {

	const [web3props, setWeb3Props] = useState({ web3: null, accounts: null, contract: null });

	// Callback function for the Login component to give us access to the web3 instance and contract functions
	const OnLogin = function(param){
		console.log('setting logged state')
		let { web3, accounts, contract } = param;
		if(web3 && accounts && accounts.length && contract){
			setWeb3Props({ web3, accounts, contract });
		}
	}

	// If the wallet is connected, all three values will be set. Use to display the main nav below.
	const contractAvailable = !(!web3props.web3 && !web3props.accounts && !web3props.contract);
	// Grab the connected wallet address, if available, to pass into the Login component
	const walletAddress = web3props.accounts ? web3props.accounts[0] : "";

	return (
		<div className="App">
			<Router>
				<header>
					<Link to="/">
							<svg id="logo" aria-hidden="true" focusable="false" className="greenzeta" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 100">
							<g>
								<path fill="currentColor" d="M82.476,13.452v9.466H15.161v27.814H69.27v9.583H15.161V88.13h67.314v9.466H5.694V13.452H82.476z"/>
								<path fill="currentColor" d="M150.491,29.813h12.504L134.714,63.12l28.398,34.476h-12.621l-22.088-27.113l-21.971,27.113H93.811l28.282-34.476L93.811,29.813h12.622l21.971,25.71L150.491,29.813z"/>
								<path fill="currentColor" d="M189.406,29.813h40.669c3.974,0,7.343,1.384,10.109,4.149c2.765,2.767,4.148,6.097,4.148,9.992v39.501c0,3.896-1.384,7.228-4.148,9.992c-2.767,2.767-6.136,4.148-10.109,4.148h-40.669c-3.897,0-7.228-1.382-9.992-4.148c-2.767-2.765-4.149-6.096-4.149-9.992V43.954c0-3.895,1.383-7.226,4.149-9.992C182.179,31.197,185.509,29.813,189.406,29.813zM230.075,39.396h-40.669c-1.247,0-2.319,0.449-3.214,1.344c-0.896,0.896-1.344,1.969-1.344,3.214v39.501c0,1.247,0.447,2.319,1.344,3.214c0.895,0.896,1.967,1.344,3.214,1.344h40.669c1.245,0,2.317-0.447,3.214-1.344c0.895-0.895,1.344-1.967,1.344-3.214V43.954c0-1.245-0.449-2.317-1.344-3.214C232.393,39.845,231.32,39.396,230.075,39.396z"/>
								<path fill="currentColor" d="M336.071,51.551l0.469,1.986c3.115,2.883,4.674,6.351,4.674,10.401v19.633c0,3.897-1.363,7.208-4.09,9.935c-2.729,2.728-6.039,4.09-9.934,4.09h-70.119V13.452h66.496c3.895,0,7.205,1.364,9.934,4.09c2.727,2.729,4.09,6.039,4.09,9.934v17.88C337.591,47.46,337.083,49.525,336.071,51.551z M323.567,22.918h-52.473c-1.248,0-2.32,0.449-3.215,1.344c-0.896,0.896-1.344,1.968-1.344,3.214v17.88c0,1.247,0.447,2.319,1.344,3.214c0.895,0.896,1.967,1.344,3.215,1.344h52.473c1.246,0,2.297-0.447,3.156-1.344c0.855-0.895,1.285-1.967,1.285-3.214v-17.88c0-1.246-0.43-2.317-1.285-3.214C325.864,23.367,324.813,22.918,323.567,22.918z M331.749,83.571V63.938c0-1.246-0.449-2.317-1.346-3.214c-0.896-0.896-1.967-1.344-3.213-1.344h-56.096c-1.248,0-2.32,0.448-3.215,1.344c-0.896,0.896-1.344,1.968-1.344,3.214v19.633c0,1.248,0.447,2.319,1.344,3.214c0.895,0.897,1.967,1.345,3.215,1.345h56.096c1.246,0,2.316-0.447,3.213-1.345C331.3,85.891,331.749,84.819,331.749,83.571z"/>
								<path fill="currentColor" d="M353.483,7.608h9.582v9.583h-9.582V7.608z M353.483,97.596V29.813h9.582v67.783H353.483z"/>
								<path fill="currentColor" d="M416.823,39.396h-29.332v44.059c0,1.247,0.447,2.319,1.344,3.214c0.895,0.896,1.967,1.344,3.213,1.344h24.775v9.583h-24.775c-3.973,0-7.324-1.382-10.051-4.148c-2.729-2.765-4.09-6.096-4.09-9.992V7.608h9.584v22.205h29.332V39.396z"/>
								<path fill="currentColor" d="M494.306,43.954v0.935h-9.701v-0.935c0-1.245-0.449-2.317-1.344-3.214c-0.896-0.895-1.969-1.344-3.213-1.344h-40.67c-1.248,0-2.318,0.449-3.215,1.344c-0.896,0.896-1.344,1.969-1.344,3.214v10.401c0,1.247,0.447,2.318,1.344,3.214c0.896,0.896,1.967,1.344,3.215,1.344h40.67c3.973,0,7.342,1.384,10.109,4.148c2.764,2.767,4.148,6.098,4.148,9.992v10.401c0,3.896-1.385,7.228-4.148,9.992c-2.768,2.767-6.137,4.148-10.109,4.148h-40.67c-3.896,0-7.227-1.382-9.992-4.148c-2.766-2.765-4.148-6.096-4.148-9.992V82.52h9.582v0.936c0,1.247,0.447,2.319,1.344,3.214c0.896,0.896,1.967,1.344,3.215,1.344h40.67c1.244,0,2.316-0.447,3.213-1.344c0.895-0.895,1.344-1.967,1.344-3.214V73.054c0-1.245-0.449-2.317-1.344-3.214c-0.896-0.895-1.969-1.344-3.213-1.344h-40.67c-3.896,0-7.227-1.383-9.992-4.148c-2.766-2.765-4.148-6.096-4.148-9.992V43.954c0-3.895,1.383-7.226,4.148-9.992c2.766-2.765,6.096-4.149,9.992-4.149h40.67c3.973,0,7.342,1.384,10.109,4.149C492.921,36.729,494.306,40.059,494.306,43.954z"/>
							</g>
							</svg>
					</Link>
					<nav>
						<ul>
								{contractAvailable && <>
									<li>
										<Link to="/mint">Mint</Link>
									</li>
									<li>
										<Link to="/gallery">Gallery</Link>
									</li>
									<li>
										<Link to="/mytokens">My Exobits</Link>
									</li>
								</>}
								<li>
									<Login callback={OnLogin} connected={contractAvailable} address={walletAddress}></Login>
								</li>
						</ul>
					</nav>
				</header>
				<div className="content">
					<Switch>
						<Route path="/mytokens">
							<MyTokens contract={web3props.contract} address={walletAddress}></MyTokens>
						</Route>
						<Route path="/gallery">
							<Gallery contract={web3props.contract}></Gallery>
						</Route>
						<Route path="/mint">
							<Mint contract={web3props.contract} address={walletAddress}></Mint>
						</Route>
						<Route path="/">
							<Home />
						</Route>
					</Switch>
				</div>
			</Router>
		</div>
	);
}

export default App;
