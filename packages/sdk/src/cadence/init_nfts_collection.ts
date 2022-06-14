import * as fcl from "@onflow/fcl";

// language=Cadence
export const initNFTCollection: string = fcl.transaction`
import NonFungibleToken from 0xNON_FUNGIBLE_TOKEN_ADDRESS
import MatrixMarket from 0xNFT_ADDRESS
import FungibleToken from 0xFUNGIBLE_TOKEN_ADDRESS
import FlowToken from 0xFLOW_TOKEN_ADDRESS


// Setup storage for MatrixMarket on signer account
transaction {
    prepare(acct: AuthAccount) {
        acct.link<&FungibleToken.Vault{FungibleToken.Receiver, FungibleToken.Balance}>
             (/public/flowTokenReceiver, target: /storage/flowTokenVault)
        if acct.borrow<&MatrixMarket.Collection>(from: MatrixMarket.CollectionStoragePath) == nil {
            let collection <- MatrixMarket.createEmptyCollection() as! @MatrixMarket.Collection
            acct.save(<-collection, to: MatrixMarket.CollectionStoragePath)
            acct.link<&{MatrixMarket.MatrixMarketCollectionPublic,NonFungibleToken.Receiver,NonFungibleToken.Provider, NonFungibleToken.CollectionPublic}>(MatrixMarket.CollectionPublicPath, target: MatrixMarket.CollectionStoragePath)
        }
    }
}`;
