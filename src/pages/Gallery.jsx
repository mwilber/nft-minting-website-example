import React, { useState } from 'react';

export default function Gallery(props) {

	const [totalSupply, setTotalSupply] = useState(null);

	const getTotalSupply = async () => {
		if(!props || !props.contract) return;
		const totalSupply = await props.contract.methods.totalSupply().call();
		// totalSupply returns a string
		setTotalSupply(parseInt(totalSupply));
	};

	const getTokenURIs = async (totalSupply) => {
		if(!totalSupply) return;
		let tokens = [];
		// Taking advantage of the fact that token IDs are an auto-incrementing integer starting with 1.
		// Starting with totalSupply and counting down to 1 gives us the tokens in order of most recent.
		for(let idx=totalSupply; idx>=1; idx--){
			let tokenURI = await props.contract.methods.tokenURI(idx).call()
			tokens.push(tokenURI);
		}
		console.log('tokens', tokens);
	};

	// Attempt to set totalSupply (total number of tokens stored in the contract).
	getTotalSupply();

	// Handle contract unavailable. 
	// This is an extra precaution since the user shouldn't be able to get to this page without connecting.
	if(!props.contract) return (<div className="page error">Contract Not Available</div>);

	// Contract should be good to go so let's set up a list of URIs.
	getTokenURIs(totalSupply);

	return (
		<div className="page gallery">
			This is the token gallery page
			<br/>
			Total Supply: {totalSupply}
		</div>
	);
}