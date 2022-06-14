import * as fcl from "@onflow/fcl";

// language=Cadence
export const checkNFTsCollection: string = fcl.script`
import NonFungibleToken from 0xNON_FUNGIBLE_TOKEN_ADDRESS
import MatrixMarket from 0xNFT_ADDRESS

pub fun main(addr: Address): Bool {
    let ref = getAccount(addr).getCapability<&{NonFungibleToken.CollectionPublic}>(MatrixMarket.CollectionPublicPath).check()
    return ref
}`;
