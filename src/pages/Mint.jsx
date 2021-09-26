import React from "react";

export default function Mint(props) {

	const DoMint = async (tokenURI) => {
		console.log('minting: ', tokenURI);
		try{
			let gasLimit = await props.contract.methods.CustomMint(tokenURI).estimateGas(
				{ 
					from: props.address, 
					value: 100000000000000
				}
			);
			let result = await props.contract.methods.CustomMint(tokenURI)
				.send({ 
					from: props.address, 
					value: 100000000000000,
					gasLimit: gasLimit
				});
			console.log('result', result);
		}catch(e){
			console.error('There was a problem while minting', e);
		}
	};

	// Handle contract unavailable. 
	// This is an extra precaution since the user shouldn't be able to get to this page without connecting.
	if(!props.contract) return (<div className="page error">Contract Not Available</div>);

	// Display the minting gallery
	return (
		<div className="page mint">
			<p>Click on an image to mint a token</p>
			{[...Array(4)].map((x, idx) => (
					<div onClick={() => DoMint('exobit_'+(idx+1)+'.json')} key={idx}>
						<img src={'/token_data/exobit_'+(idx+1)+'.png'} alt={'exobit_'+(idx+1)} />
					</div>
				)
			)}
		</div>
	);
}