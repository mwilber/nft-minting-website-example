import React from "react";
import Web3 from "web3";

import ExobitsContract from '../contract/Exobits.json';

export default function Login(props) {

	const contractAddress = "0x5bbec211972328487e8859740aade132ba7a1916";

	const DoConnect = async () => {

		console.log('Connecting....');


		try {
			// Get network provider and web3 instance.
			const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
			// Request account access if needed
			await window.ethereum.request({ method: 'eth_requestAccounts' })
			// Use web3 to get the user's accounts.
			const accounts = await web3.eth.getAccounts();
			// Get an instance of the contract sop we can call our contract functions
			const instance = new web3.eth.Contract(
				ExobitsContract.abi, 
				contractAddress
			);
			console.log('connected', accounts, instance);
			props.callback({ web3, accounts, contract: instance });

		} catch (error) {
			// Catch any errors for any of the above operations.
			console.error("Could not connect to wallet.", error);
		}
	};

	if(!props.connected){
		return <button className="login" onClick={DoConnect}>Connect Wallet</button>;
	} else {
		console.log('address', props.address);
		return <>[{props.address.slice(0,6)}]</>;
	}
}