import * as fcl from "@onflow/fcl";

// language=Cadence
export const getNFTsScript: string = fcl.script`
import NonFungibleToken from 0xNON_FUNGIBLE_TOKEN_ADDRESS
import MatrixMarket from 0xNFT_ADDRESS
pub fun main(address: Address): [UInt64]{
    let collection = getAccount(address)
        .getCapability(MatrixMarket.CollectionPublicPath)
        .borrow<&{NonFungibleToken.CollectionPublic,NonFungibleToken.Receiver}>() ?? panic("NFT Collection not found")
    let ids = collection.getIDs()

    return ids
}`;
