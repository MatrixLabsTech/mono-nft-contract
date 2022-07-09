## Deploy Project to Emulator

Start local emulator

`flow emulator`

Deploy all project

`bash ./sh/deploy-to-local-emulator.sh`


Deploy to mainnet

```bash
flow accounts add-contract MonoCatMysteryBox ./cadence/contracts/MonoCatMysteryBox.cdc -f flow.json -f flow.mainnet.json -n mainnet --signer main
flow accounts add-contract MonoCat ./cadence/contracts/MonoCat.cdc -f flow.json -f flow.mainnet.json -n mainnet --signer main
flow accounts add-contract MonoSilver ./cadence/contracts/MonoSilver.cdc -f flow.json -f flow.mainnet.json -n mainnet --signer main
flow accounts add-contract MonoGold ./cadence/contracts/MonoGold.cdc -f flow.json -f flow.mainnet.json -n mainnet --signer main
flow accounts add-contract MonoPaymentMinter ./cadence/contracts/MonoPaymentMinter.cdc -f flow.json -f flow.mainnet.json -n mainnet --signer main
```

Add admin pubKey
```bash
flow transactions send ./cadence/transactions/addKey.cdc 4b0cdb789e2308ef014e860878e0e641e0939fc8ab395336e64b48f694b413fdcfe96b0ac2ca15ea66a2d4d75514fa36247879ab61015a6d530bc920f40d578a 1000.0 -f ./flow.json -n mainnet --signer main
```

### Deployment
mainnet: [0x8529aaf64c168952](https://flow-view-source.com/mainnet/account/0x8529aaf64c168952)
