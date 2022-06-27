import NonFungibleToken from "./lib/NonFungibleToken.cdc"
import FungibleToken from "./lib/FungibleToken.cdc"
import MonoGold from "./MonoGold.cdc"
import MonoSilver from "./MonoGold.cdc"
import FUSD from "./lib/FUSD.cdc"

pub contract MonoPaymentMinter {
    pub let goldPrice: UFix64
    pub let silverPrice: UFix64

    pub fun paymentMintGold(
        creator: AuthAccount,
        payment: @FungibleToken.Vault,
        recipient: &{NonFungibleToken.CollectionPublic}
    ){
        pre {
             payment.isInstance(Type<@FUSD.Vault>()): "payment vault is not requested fungible token"
             payment.balance == self.goldPrice: "payment vault does not contain requested price"
        }
        let fusdReceiver = self.account.getCapability<&FUSD.Vault{FungibleToken.Receiver}>(/public/fusdReceiver)!
        let receiver = fusdReceiver.borrow()!

        receiver.deposit(from: <- payment)

        let minter = self.account.borrow<&MatrixLabsRCNFT.NFTMinter>(from: /storage/MatrixLabsRCNFTNFTMinter)!;
        minter.mintNFT(creator: creator, recipient: recipient, subCollectionId: "", metadata: {})
    }

    init() {
        self.goldPrice=16.0
        self.silverPrice=1.6

    }
}
