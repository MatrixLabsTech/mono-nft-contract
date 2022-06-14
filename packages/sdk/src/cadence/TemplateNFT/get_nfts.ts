import * as fcl from "@onflow/fcl";

// language=Cadence
export const templateNFTGetNFTsScript: string = `
import NonFungibleToken from 0xNON_FUNGIBLE_TOKEN_ADDRESS
import _NFT_NAME_ from _NFT_ADDRESS_
pub fun main(address: Address): [UInt64]{
    let collection = getAccount(address)
        .getCapability(_NFT_NAME_.CollectionPublicPath)
        .borrow<&{NonFungibleToken.CollectionPublic,NonFungibleToken.Receiver}>() ?? panic("NFT Collection not found")
    let ids = collection.getIDs()

    return ids
}`;
