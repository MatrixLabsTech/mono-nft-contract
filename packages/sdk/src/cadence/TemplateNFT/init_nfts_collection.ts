import * as fcl from "@onflow/fcl";

// language=Cadence
export const templateNFTInitNFTCollection: string = `
import NonFungibleToken from 0xNON_FUNGIBLE_TOKEN_ADDRESS
import FungibleToken from 0xFUNGIBLE_TOKEN_ADDRESS
import FlowToken from 0xFLOW_TOKEN_ADDRESS
import _NFT_NAME_ from _NFT_ADDRESS_


// Setup storage for _NFT_NAME_ on signer account
transaction {
    prepare(acct: AuthAccount) {
        acct.link<&FungibleToken.Vault{FungibleToken.Receiver, FungibleToken.Balance}>
             (/public/flowTokenReceiver, target: /storage/flowTokenVault)
        if acct.borrow<&_NFT_NAME_.Collection>(from: _NFT_NAME_.CollectionStoragePath) == nil {
            let collection <- _NFT_NAME_.createEmptyCollection() as! @_NFT_NAME_.Collection
            acct.save(<-collection, to: _NFT_NAME_.CollectionStoragePath)
            acct.link<&{_NFT_NAME_.MatrixMarketCollectionPublic,NonFungibleToken.Receiver,NonFungibleToken.Provider, NonFungibleToken.CollectionPublic}>(_NFT_NAME_.CollectionPublicPath, target: _NFT_NAME_.CollectionStoragePath)
        }
    }
}`;
