import React, {useState} from "react";

export default function MyTokens(props) {

	const [totalSupply, setTotalSupply] = useState(null);
	const [tokenURIs, setTokenURIs] = useState([]);

	const getTotalSupply = async () => {
		if(!props || !props.contract) return;
		const totalSupply = await props.contract.methods.tokensOfOwner(props.address).call();
        console.log("🚀 ~ file: MyTokens.jsx ~ line 11 ~ getTotalSupply ~ totalSupply", totalSupply)
		// totalSupply returns a string
		setTotalSupply(totalSupply);
	};

	const getTokenURIs = async (totalSupply) => {
		if(!totalSupply || !totalSupply.length) return;
		let tokens = [];
		// Taking advantage of the fact that token IDs are an auto-incrementing integer starting with 1.
		// Starting with totalSupply and counting down to 1 gives us the tokens in order of most recent.
		for(let id of totalSupply){
			try{
				let tokenURI = await props.contract.methods.tokenURI(id).call()
				let response = await fetch(tokenURI);
				let metaData = await response.json();
				if(metaData && metaData.image)
					tokens.push(metaData.image);
			}catch(e){
				// Either the contract call or the fetch can fail. You'll want to handle that in production.
				console.error('Error occurred while fetching metadata.')
				continue;
			}
		}
		if(tokens.length) setTokenURIs([...tokens]);

	};

	// Attempt to set totalSupply (total number of tokens stored in the contract).
	if(!totalSupply) getTotalSupply();

	// Handle contract unavailable. 
	// This is an extra precaution since the user shouldn't be able to get to this page without connecting.
	if(!props.contract) return (<div className="page error">Contract Not Available</div>);

	// Contract should be good to go so let's set up a list of URIs.
	if(totalSupply && !tokenURIs.length) getTokenURIs(totalSupply);

	// return (
	// 	<div className="page gallery">
	// 		This is the token gallery page
	// 		<br/>
	// 		Total Supply: {totalSupply}
	// 		{tokenURIs.map((uri, idx) => (
	// 			<div key={idx}>
	// 				<img src={uri} alt={'token '+idx} />
	// 			</div>
	// 		))}
	// 	</div>
	// );
	return (
		<div className="page my-tokens">
			<p>This is the owner gallery</p>
			{tokenURIs.map((uri, idx) => (
				<div key={idx}>
					<img src={uri} alt={'token '+idx} />
				</div>
			))}
		</div>
	);
}