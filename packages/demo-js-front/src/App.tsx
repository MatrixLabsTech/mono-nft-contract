import React, { useCallback, useEffect } from "react";
import "./App.css";
import {
  fcl,
  FlowEnv,
  MatrixMarketClient,
  MatrixMarketOpenOfferClient,
} from "@matrix-labs/matrix-marketplace-nft-sdk";
const openOfferClient = new MatrixMarketOpenOfferClient();
const nftClient = new MatrixMarketClient();

const network = process.env.REACT_APP_NETWORK;
function App() {
  const check = useCallback(async () => {
    await fcl.currentUser.unauthenticate();
    console.log(`checking.....${network}`);
    if (network === "test") {
      console.log("checking test....");
      await nftClient.bindFcl(fcl, FlowEnv.flowTestnet);
      await openOfferClient.bindFcl(fcl, FlowEnv.flowTestnet);
      await fcl.logIn();
      await fcl.authenticate();
    } else if (network === "local") {
      console.log("checking local....");
      await nftClient.bindFcl(fcl, FlowEnv.localEmulator);
      await openOfferClient.bindFcl(fcl, FlowEnv.localEmulator);
      await fcl.logIn();
      await fcl.authenticate();
    }
  }, []);

  useEffect(() => {
    check();
  }, [check]);

  const mint = async () => {
    let ret;
    const user = await fcl.currentUser().snapshot();
    console.log(user);
    ret = await nftClient
      .mintNFTs(
        "0x7f3812b53dd4de20",
        [user.addr],
        ["1231as"],
        [[{ key: "version", value: "1.0.0" }]]
      )
      .catch(console.error);
    console.log(ret);
  };

  const checkNFTsCollection = async () => {
    let ret;
    const user = await fcl.currentUser().snapshot();
    //ret = await nftClient.checkNFTsCollection("0x445697f20309b7c0");
    ret = await nftClient.checkNFTsCollection(user.addr);
    console.log(ret);
  };

  const getNFTs = async () => {
    let ret;

    const user = await fcl.currentUser().snapshot();
    console.log(user);
    ret = await nftClient.getNFTs(user.addr);
    console.log(ret);
  };

  const initNFTCollection = async () => {
    let ret;
    ret = await nftClient.initNFTCollection();
    console.log(ret);
  };

  const initOpenOffer = async () => {
    let ret;
    const user = await fcl.currentUser().snapshot();
    console.log(user);
    ret = await openOfferClient.initOpenOffer().catch(console.error);
    console.log(ret);
  };

  const openOffer = async () => {
    // let ret;
    const user = await fcl.currentUser().snapshot();
    console.log(user);
    // ret = await openOfferClient.openOffer(19, "2.58").catch(console.error);
    // console.log(ret);
  };

  const removeOpenOffer = async () => {
    let ret;
    const user = await fcl.currentUser().snapshot();
    console.log(user);
    ret = await openOfferClient.removeOffer(90575769).catch(console.error);
    console.log(ret);
  };

  const acceptOffer = async () => {
    // let ret;
    const user = await fcl.currentUser().snapshot();
    console.log(user);
    // ret = await openOfferClient
    //   .acceptOffer(90576137, "0xae8b87df71d454cb")
    //   .catch(console.error);
    // console.log(ret);
  };

  const getOfferDetails = async () => {
    let ret;

    const user = await fcl.currentUser().snapshot();
    console.log(user);
    ret = await openOfferClient.getOfferDetails("0xae8b87df71d454cb", 90576137);
    console.log(ret);
  };

  const getOfferIds = async () => {
    let ret;

    const user = await fcl.currentUser().snapshot();
    console.log(user);
    ret = await openOfferClient.getOfferIds(user.addr);
    console.log(ret);
  };

  return (
    <div className="App">
      <button onClick={initNFTCollection} className="App-link">
        initNFTCollection
      </button>
      <button onClick={checkNFTsCollection} className="App-link">
        checkNFTsCollection
      </button>
      <button onClick={getNFTs} className="App-link">
        getNFTs
      </button>
      <button onClick={mint} className="App-link">
        mint
      </button>

      <button onClick={initOpenOffer} className="App-link">
        initOpenOffer
      </button>
      <button onClick={openOffer} className="App-link">
        openOffer
      </button>
      <button onClick={removeOpenOffer} className="App-link">
        removeOpenOffer
      </button>
      <button onClick={acceptOffer} className="App-link">
        acceptOffer
      </button>
      <button onClick={getOfferDetails} className="App-link">
        getOfferDetails
      </button>
      <button onClick={getOfferIds} className="App-link">
        getOfferIds
      </button>
    </div>
  );
}

export default App;
