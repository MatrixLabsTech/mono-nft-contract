import FungibleToken from "../contracts/lib/FungibleToken.cdc"
import FUSD from "../contracts/lib/FUSD.cdc"
import NonFungibleToken from "../contracts/lib/NonFungibleToken.cdc"
import MonoPaymentMinter from "../contracts/MonoPaymentMinter.cdc"
import MonoGold from "../contracts/MonoGold.cdc"

// This transaction adds an empty Vault to account 0x02
// and mints an NFT with id=1 that is deposited into
// the NFT collection on account 0x01.
transaction {

  prepare(acct: AuthAccount) {
    let admin = acct.borrow<&MonoPaymentMinter.Administrator>(from: MonoPaymentMinter.AdminStoragePath)!
    admin.setGold(goldPrice: 0.11, goldStartTime: getCurrentBlock().timestamp-10.0, goldEndTime: getCurrentBlock().timestamp+10.0, goldBaseUri: "test")
     let mainFlowVault = acct.borrow<&FUSD.Vault>(from: /storage/fusdVault)
                    ?? panic("Cannot borrow FlowToken vault from acct storage")
     let payment <- mainFlowVault.withdraw(amount: 0.11)

     let recipient = acct.getCapability<&{NonFungibleToken.CollectionPublic}>(MonoGold.CollectionPublicPath).borrow() ?? panic("recipient collection not found")
    MonoPaymentMinter.paymentMintGold(payment: <-payment, recipient: recipient)
  }

}
