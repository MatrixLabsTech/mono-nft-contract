import * as fcl from "@onflow/fcl";

// language=Cadence
export const templateNFTGetNFTsMetadataScript: string = `
import NonFungibleToken from 0xNON_FUNGIBLE_TOKEN_ADDRESS
import _NFT_NAME_ from _NFT_ADDRESS_
pub fun main(address: Address, ids: [UInt64]): [UInt64]{
    let collection = getAccount(address)
        .getCapability(_NFT_NAME_.CollectionPublicPath)
        .borrow<&{_NFT_NAME_._NFT_NAME_CollectionPublic}>() ?? panic("NFT Collection not found")
    if(ids.length == 0){
        ids = collection.getIDs()
    }
    let ret = []
    var i = 0
    while i < ids.length {
        ret.append(collection.borrow_NFT_NAME_(i))
        i = i + 1
    }
    let ids = collection.borrow_NFT_NAME_(i)

    return ids
}`;
