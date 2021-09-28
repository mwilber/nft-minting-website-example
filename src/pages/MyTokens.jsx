import React, {useState} from "react";

export default function MyTokens(props) {

	const [userTokens, setUserTokens] = useState(null);
	const [tokenURIs, setTokenURIs] = useState([]);

	// Populate userTokens with an array of token IDs belonging to the curent wallet address.
	const GetUserTokens = async () => {
		if(!props || !props.contract) return;
		const userTokens = await props.contract.methods.tokensOfOwner(props.address).call();
		setUserTokens(userTokens);
	};

	// Populate the setTokenURIs variable with token URIs belonging to the curent wallet address.
	const GetTokenURIs = async (userTokens) => {
		if(!userTokens || !userTokens.length) return;
		let tokens = [];
		// Taking advantage of the fact that token IDs are an auto-incrementing integer starting with 1.
		// Starting with userTokens and counting down to 1 gives us the tokens in order of most recent.
		for(let id of userTokens){
			try{
				// Get the metadata URI associated with the token
				let tokenURI = await props.contract.methods.tokenURI(id).call();
				// Fetch the json metadata the token points to
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

	// Get all token IDs associated with the wallet address when the component mounts.
	if(!userTokens) GetUserTokens();

	// Set up the list of available token URIs when the component mounts.
	if(userTokens && !tokenURIs.length) GetTokenURIs(userTokens);

	// Display the personal token gallery
	return (
		<div className="page my-tokens">
			<h2>Private Gallery</h2>
			{tokenURIs.map((uri, idx) => (
				<div key={idx}>
					<img src={uri} alt={'token '+idx} />
				</div>
			))}
		</div>
	);
}