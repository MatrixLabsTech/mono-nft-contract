import * as t from '@onflow/types';
import {deployContract} from '../cadence/deployContract';
import {templateNFTCheckNFTsCollection} from '../cadence/TemplateNFT/check_nfts_collection';
import {templateNFTGetNFTsScript} from '../cadence/TemplateNFT/get_nfts';
import {templateNFTInitNFTCollection} from '../cadence/TemplateNFT/init_nfts_collection';
import {MatrixMarketTemplateNFT} from '../cadence/TemplateNFT/MatrixMarketTemplateNFT';
import {templateNFTMintNFTs} from '../cadence/TemplateNFT/mint_nfts';
import {FlowEnv} from './env';
import {FlowService} from './flow';

export class NFTClient {
    private fcl: any;

    private env: FlowEnv | undefined;
    
    private authMethod?: (account?: any) => Promise<any>
    
    async bindFcl(fcl: any, env: FlowEnv, config?: {}): Promise<void> {
        this.env = env;
        this.fcl = fcl;
        switch (env) {
            case FlowEnv.flowTestnet: {
                await this.fcl
                  .config()
                  .put("accessNode.api", "https://rest-testnet.onflow.org") // connect to Flow testnet
                  .put("discovery.wallet", "https://fcl-discovery.onflow.org/testnet/authn") // use Blocto testnet wallet
                  .put('0xFUNGIBLE_TOKEN_ADDRESS', '0x9a0766d93b6608b7')
                  .put('0xFUSD_ADDRESS', '0xe223d8a629e49c68')
                  .put('0xFLOW_TOKEN_ADDRESS', '0x7e60df042a9c0868')
                  .put('0xNFT_ADDRESS', '0x7f3812b53dd4de20')
                  .put('0xNON_FUNGIBLE_TOKEN_ADDRESS', '0x631e88ae7f1d7c20')
                  .put('0xMETADATA_VIEWS_ADDRESS', '0x631e88ae7f1d7c20');
                break;
            }
            case FlowEnv.flowMainnet: {
                await this.fcl
                  .config()
                  .put("accessNode.api", "https://rest-mainnet.onflow.org")
                  .put("discovery.wallet", "https://fcl-discovery.onflow.org/authn") // use Blocto wallet
                  .put('0xFUNGIBLE_TOKEN_ADDRESS', '0xf233dcee88fe0abe')
                  .put('0xFUSD_ADDRESS', '0x3c5959b568896393')
                  .put('0xFLOW_TOKEN_ADDRESS', '0x1654653399040a61')
                  .put('0xNFT_ADDRESS', '')
                  .put('0xNON_FUNGIBLE_TOKEN_ADDRESS', '0x1d7e57aa55817448')
                  .put('0xMETADATA_VIEWS_ADDRESS', '0x1d7e57aa55817448');
                break;
            }
            case FlowEnv.localEmulator:
            default:
                await this.fcl
                  .config()
                  .put('accessNode.api', 'http://localhost:8080')
                  .put('discovery.wallet', 'http://localhost:8701/fcl/authn')
                  .put('0xFUNGIBLE_TOKEN_ADDRESS', '0xee82856bf20e2aa6')
                  .put('0xFUSD_ADDRESS', '0xf8d6e0586b0a20c7')
                  .put('0xFLOW_TOKEN_ADDRESS', '0x0ae53cb6e3f42a79')
                  .put('0xNFT_ADDRESS', '0xf8d6e0586b0a20c7')
                  .put('0xNON_FUNGIBLE_TOKEN_ADDRESS', '0xf8d6e0586b0a20c7')
                  .put('0xMETADATA_VIEWS_ADDRESS', '0xf8d6e0586b0a20c7');
        }
    }
    
    bindAuth(flowAddress: string, privateKeyHex: string, accountIndex: number = 0) {
        this.authMethod = new FlowService(flowAddress, privateKeyHex, accountIndex).authorize();
    }
    
    private getAuth() {
        return this.authMethod || this.fcl.currentUser().authorization
    }
    
    async mintNFTs(NFTName: string, NFTAddress: string, recipientBatch: string[], metadataBatch: Array<Array<{ key: string, value: string }>>): Promise<string> {
        try {
            const response = await this.fcl.send([
                this.fcl.transaction(templateNFTMintNFTs.replace(/_NFT_NAME_/g, NFTName).replace(/_NFT_ADDRESS_/g, NFTAddress)),
                this.fcl.args([this.fcl.arg(recipientBatch, t.Array(t.Address)), this.fcl.arg(metadataBatch, t.Array(t.Dictionary({
                    key: t.String,
                    value: t.String
                })))]),
                this.fcl.proposer(this.getAuth()),
                this.fcl.authorizations([this.getAuth()]),
                this.fcl.limit(1000),
                this.fcl.payer(this.getAuth())
            ]);
            const ret = await this.fcl.tx(response).onceSealed();
            if (ret.errorMessage !== '' && ret.status != 4) {
                return Promise.reject(ret.errorMessage);
            }
            return response.transactionId;
        } catch (error) {
            console.error(error);
            return Promise.reject(error);
        }
    }
    
    async checkNFTsCollection(NFTName: string, NFTAddress: string, address: string): Promise<boolean> {
        try {
            const response = await this.fcl.send([
                this.fcl.script(templateNFTCheckNFTsCollection.replace(/_NFT_NAME_/g, NFTName).replace(/_NFT_ADDRESS_/g, NFTAddress)),
                this.fcl.args([this.fcl.arg(address, t.Address)]),
                this.fcl.limit(1000)
            ]);
            return this.fcl.decode(response);
        } catch (error) {
            console.error(error);
            return Promise.reject(error);
        }
    }
    
    async getNFTs(NFTName: string, NFTAddress: string, account: string): Promise<number[]> {
        try {
            const response = await this.fcl.send([this.fcl.script(templateNFTGetNFTsScript.replace(/_NFT_NAME_/g, NFTName).replace(/_NFT_ADDRESS_/g, NFTAddress)), this.fcl.args([this.fcl.arg(account, t.Address)]), this.fcl.limit(2000)]);
            
            return this.fcl.decode(response);
        } catch (error) {
            console.error(error);
            return Promise.reject(error);
        }
    }
    
    async initNFTCollection(NFTName: string, NFTAddress: string): Promise<string> {
        try {
            const response = await this.fcl.send([
                this.fcl.transaction(templateNFTInitNFTCollection.replace(/_NFT_NAME_/g, NFTName).replace(/_NFT_ADDRESS_/g, NFTAddress)),
                this.fcl.proposer(this.getAuth()),
                this.fcl.authorizations([this.getAuth()]),
                this.fcl.limit(1000),
                this.fcl.payer(this.getAuth())
            ]);
            const ret = await this.fcl.tx(response).onceSealed();
            if (ret.errorMessage !== '' && ret.status != 4) {
                return Promise.reject(ret.errorMessage);
            }
            return response.transactionId;
        } catch (error) {
            console.error(error);
            return Promise.reject(error);
        }
    }
}
