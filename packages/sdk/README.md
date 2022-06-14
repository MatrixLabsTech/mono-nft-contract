### Install

`yarn add @matrix-labs/matrix-marketplace-nft-sdk`

```typescript

    /**
     * first step 
     *
     * @async
     * @param fcl:  import * as fcl from "@onflow/fcl"
     * @example  import * as fcl from "@onflow/fcl"; const client = new MatrixMarketClient();  client.bindFcl(fcl);
     */
    public bindFcl(fcl: any): Promise<void> 

    /**
     * check address whether support this NFTsCollection or not
     *
     * @async
     * @param {string} address
     * @returns {boolean} support or not
     * @if return false, invoke function initNFTCollection()
     */
    public async checkNFTsCollection(address: string): Promise<boolean> 

    /**
     * init NFTCollection for Address
     * @async
     * @returns {Promise<string>} transaction id
     * @example ret = await client.initNFTCollection();
     */
    public async initNFTCollection(): Promise<string> 
    
     /**
     * Get all assets from given account
     *
     * @async
     * @param {string} address
     * @returns {Promise<MatrixMarket[]>} transaction id
     * @example ret = await client.getNFTs("0x01cf0e2f2f715450");
     */
    public async getNFTs(account: string): Promise<MatrixMarket[]> 

    /**
     * mintNFTsBatch
     * @param string nftAdminAddress: 0x7f3812b53dd4de20
     * @param {string} recipientBatch - recipient address
     * @param {string} subCollectionIdBatch - subCollectionId
     * @param Array<{[key:string]:string}> metadataBatch - metadataBatch
     * @async
     * @returns {Promise<string>} transaction id
     * @example ret = await client.mintNFTs('0x7f3812b53dd4de20',[user.addr], ["1231as"],  [{key:"version",value:"1.0.0"}]).catch(console.error);
     */
    public async mintNFTs(
        nftAdminAddress: string, 
        recipientBatch: string[], 
        subCollectionIdBatch: string[], 
        metadataBatch: Array<{[key:string]:string}>): Promise<string> {
        
