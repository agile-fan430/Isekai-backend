import Web3 from 'web3';
import * as dotenv from "dotenv";
import { Createsalefixedprice } from '../database/models';

// const OFFICIALMARKET_ABI = require("../officialmarketplace-abi.json");
// const OFFICIALMARKET_ADDRESS = "0x3e7BF9CD48E775a5462e958c213b71E4e0B79383";

// const INFURA_API_KEY = process.env.INFURA_API_KEY || "";

// const web3Eth = new Web3(`https://rinkeby.infura.io/v3/${INFURA_API_KEY}`);
// const web3EthWSS = new Web3(new Web3.providers.WebsocketProvider(`wss://rinkeby.infura.io/ws/v3/${INFURA_API_KEY}`));


// const officialMarket = new web3EthWSS.eth.Contract( BridgeEthABI, bridgeETHAddress );

export const createsalefixedpriceController = () => {
  const createsale = async (req, res, next) => {

    // console.log("createSaleFixedPrice!!!");
    // console.log("EVENT-----", officialMarket.events);
    // const blockNumber = await web3Eth.eth.getBlockNumber();

    // officialMarket.events.Transfer(
    //   {fromBlock: blockNumber, step:0}
    // )
    // .on("connected", () => {
    //   console.log("SUCCEEDED!");
    // })
    // .on('error', (error) => {
    //   console.log(error);
    // })
    // .on('data', (event) => {
    //   const { 
    //     saleId,
    //     isERC721,
    //     tokenId,
    //     nftContract,
    //     fixedPrice,
    //     startingTime,
    //     seller,
    //     amount} = event.returnValues;
    // })


    const nftInfo = req.body;
    // Insert data to Createsalefixedprice table
    try {
      const data = await Createsalefixedprice.create(
        {
          nft_addr: nftInfo.nft_addr,
          token_id: nftInfo.token_id,
          amount: nftInfo.amount,
          fixed_price: nftInfo.fixed_price,
          start_time: nftInfo.start_time
        }
      );
      if (res.status(200).json({ success: true, data })) {
        res.send(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const listsale = async (req, res, next) => {
    const nftInfo = req.body;
    // Insert data to Createsalefixedprice table
    try {
      const data = await Createsalefixedprice.findAll();
      if (res.status(200).json({ success: true, data })) {
        res.send(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return {createsale, listsale};
};
