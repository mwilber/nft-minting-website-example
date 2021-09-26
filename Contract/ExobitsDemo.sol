// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract ExobitsDemo is ERC721, ERC721Enumerable, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    
    mapping(string => uint256) public _uriId;
    
    constructor() ERC721("ExoBitsDemo", "XOBD") {}
    
    function CustomMint(string memory _uri) public payable returns (uint256) {
        
        // Ideally, you would pass in some sort of unique identifier to reference your token
        // for this demo we're just repurposing the token URI
        require(_uriId[_uri] == 0, "This key is already minted");
        
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();

        _safeMint(msg.sender, newItemId);
        _uriId[_uri] = newItemId;
        _setTokenURI(newItemId, _uri);

        return newItemId;
    }
    
    function _baseURI() internal pure override returns (string memory) {
        return "http://localhost:3000";
    }
    
    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }
    
    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }
    
    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }
    
    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
    
    function tokenByUri(string memory _uri) external view returns(uint256) {
        return _uriId[_uri];
    }

    function tokensOfOwner(address _owner) external view returns(uint256[] memory ownerTokens) {
        uint256 tokenCount = balanceOf(_owner);

        if (tokenCount == 0) {
            // Return an empty array
            return new uint256[](0);
        } else {
            uint256[] memory result = new uint256[](tokenCount);
            uint256 totalKeys = totalSupply();
            uint256 resultIndex = 0;

            // We count on the fact that all tokens have IDs starting at 1 and increasing
            // sequentially up to the totalSupply count.
            uint256 tokenId;

            for (tokenId = 1; tokenId <= totalKeys; tokenId++) {
                if (ownerOf(tokenId) == _owner) {
                    result[resultIndex] = tokenId;
                    resultIndex++;
                }
            }

            return result;
        }
    }
}
