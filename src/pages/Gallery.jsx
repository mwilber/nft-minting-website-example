import React, { useState } from 'react';

export default function Gallery(props) {

	const [totalSupply, setTotalSupply] = useState(null);
	const [tokenURIs, setTokenURIs] = useState([]);

	// Get the total number of minted tokens in the contract
	const GetTotalSupply = async () => {
		if(!props || !props.contract) return;
		const totalSupply = await props.contract.methods.totalSupply().call();
		// totalSupply returns a string
		setTotalSupply(parseInt(totalSupply));
	};

	// Populate the setTokenURIs variable with tokens that are minted.
	const GetTokenURIs = async (totalSupply) => {
		if(!totalSupply) return;
		let tokens = [];
		// Taking advantage of the fact that token IDs are an auto-incrementing integer starting with 1.
		// Starting with totalSupply and counting down to 1 gives us the tokens in order of most recent.
		for(let idx=totalSupply; idx>=1; idx--){
			try{
				// Get the metadata URI associated with the token.
				let tokenURI = await props.contract.methods.tokenURI(idx).call()
				// Fetch the json metadata the token points to.
				let response = await fetch(tokenURI);
				let metaData = await response.json();
				// Add the image url if available in the metadata.
				if(metaData && metaData.image)
					tokens.push(metaData.image);
			}catch(e){
				// Either the contract call or the fetch can fail. You'll want to handle that in production.
				console.error('Error occurred while fetching metadata.')
				continue;
			}
		}

		// Update the list of available asset URIs
		if(tokens.length) setTokenURIs([...tokens]);
	};

	// Handle contract unavailable. 
	// This is an extra precaution since the user shouldn't be able to get to this page without connecting.
	if(!props.contract) return (<div className="page error">Contract Not Available</div>);
	
	// Attempt to set totalSupply (total number of tokens stored in the contract).
	if(!totalSupply) GetTotalSupply();

	// Set up the list of available token URIs when the component mounts.
	if(totalSupply && !tokenURIs.length) GetTokenURIs(totalSupply);

	// Display the token gallery
	return (
		<div className="page gallery">
			<h2>Gallery Page</h2>
			<br/>
			Total Supply: {totalSupply}
			{tokenURIs.map((uri, idx) => (
				<div key={idx}>
					<img src={uri} alt={'token '+idx} />
				</div>
			))}
		</div>
	);
}