
pub contract MonoGoldPaymentMinter {
    pub fun PaymentMint(
        creator: AuthAccount,
        payment: @FungibleToken.Vault,
        recipient: &{NonFungibleToken.CollectionPublic}
    ){
        let flowReceiver = self.account.getCapability<&FlowToken.Vault{FungibleToken.Receiver}>(/public/flowTokenReceiver)!
        let receiver = flowReceiver.borrow()!

        receiver.deposit(from: <- payment)

        let minter = self.account.borrow<&MatrixLabsRCNFT.NFTMinter>(from: /storage/MatrixLabsRCNFTNFTMinter)!;
        minter.mintNFT(creator: creator, recipient: recipient, subCollectionId: "", metadata: {})
    }

    init() {
    }
}
