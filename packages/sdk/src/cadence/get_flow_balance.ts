import * as fcl from "@onflow/fcl";

// language=Cadence
export const getFLOWBalanceScript: string = fcl.script`
import FungibleToken from 0xFUNGIBLE_TOKEN_ADDRESS
import FlowToken from 0xFLOW_TOKEN_ADDRESS

pub fun main(address: Address): UFix64 {

    let vaultRef = getAccount(address)
        .getCapability(/public/flowTokenBalance)
        .borrow<&FlowToken.Vault{FungibleToken.Balance}>()
        ?? panic("Could not borrow Balance reference to the Vault")

    return vaultRef.balance
}`;
