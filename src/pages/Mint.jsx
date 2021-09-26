import React, { useState } from 'react';

export default function Mint(props) {

	const [tokenURIs, setTokenURIs] = useState([]);

	// Populate the tokenURIs variable with tokens that are not yet minted.
	const CheckTokenURIs = async () => {
		let uris = [];

		// For this demo there are only 4 images named sequentially. 
		for(let idx = 1; idx <= 4; idx++ ){
			let uri = '/token_data/exobit_'+idx+'.json';
			// Call the contract and get the id of the uri. If the uri doesn't belong to a token, it will return 0
			let tokenId = await props.contract.methods.tokenByUri(uri).call();
			// The token ID comes in as a string.
			if(tokenId === "0")
				uris.push(uri);
		}

		// Update the list of available token URIs
		if(uris.length) setTokenURIs([...uris]);
	}

	// Handle the click to mint
	const DoMint = async (tokenURI) => {
		console.log('minting: ', tokenURI);
		try{
			// Estimate the gas required for the transaction
			let gasLimit = await props.contract.methods.CustomMint(tokenURI).estimateGas(
				{ 
					from: props.address, 
					value: 100000000000000
				}
			);
			// Call the mint function.
			let result = await props.contract.methods.CustomMint(tokenURI)
				.send({ 
					from: props.address, 
					value: 100000000000000,
					// Setting the gasLimit with the estimate accuired above helps ensure accurate estimates in the wallet transaction.
					gasLimit: gasLimit
				});

			// Output the result for the console during development. This will help with debugging transaction errors.
			console.log('result', result);

			// Refresh the gallery
			CheckTokenURIs();

		}catch(e){
			console.error('There was a problem while minting', e);
		}
	};

	// Handle contract unavailable. 
	// This is an extra precaution since the user shouldn't be able to get to this page without connecting.
	if(!props.contract) return (<div className="page error">Contract Not Available</div>);

	// Set up the list of available token URIs when the component mounts.
	if(!tokenURIs.length) CheckTokenURIs();

	// Display the minting gallery
	return (
		<div className="page mint">
			<p>Click on an image to mint a token</p>
			{tokenURIs.map((uri, idx) => (
					<div onClick={() => DoMint(uri)} key={idx}>
						<img src={uri.replace('.json', '.png')} alt={'exobit_'+(idx+1)} />
					</div>
				)
			)}
		</div>
	);
}