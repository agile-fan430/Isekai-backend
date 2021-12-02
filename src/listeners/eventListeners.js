import { token } from 'morgan';
import { NFT } from '../database/models';
import { Collector } from '../database/models';
import { Artist } from '../database/models';
import { CollectorNFTs } from '../database/models';
import { FixedPriceSale } from '../database/models';
import { NftSale } from '../database/models';
import { determineRank, getAttributesValue } from "./helpers";

const artist_ABI = require("../../abis/artist.json");
const erc1155_ABI = require("../../abis/Erc1155Collectable.json");
const normal_erc1155_ABI = require("../../abis/Erc1155Collectable.json");
const official_ABI = require("../../abis/OfficialMarketplace.json");

const artist_addr = "0xedfDfa7b44CE8d2473327436ed4B300d02cf75bE";
const erc1155_addr = "0xe8A0071F41e12D81D922A3aa12C70851C7409019";
const normal_erc1155_addr = "0xe8A0071F41e12D81D922A3aa12C70851C7409019";
const official_addr = "0x178084F43596C1baA56E11C781a6BCdE65cFbeb6";
const zero_addr = "0x0000000000000000000000000000000000000000";

const Web3 = require('web3');
const web3 = new Web3('wss://rinkeby-light.eth.linkpool.io/ws');



export const artistNftMinted = async () => {
  // provider for node.js
  const contractInstance = new web3.eth.Contract(artist_ABI, artist_addr);
  contractInstance.events.allEvents()
    .on('data', async (e) => {
      if (e.event === 'ArtistNFTMinted') {
        // console.log(e);
        // console.log(e.returnValues.tokenID);
        const token_id = e.returnValues.tokenID;
        const amountMinted = e.returnValues.amountMinted;
        const contract_addr = e.returnValues.contractAddress;
        const token_metadata_uri = e.returnValues.tokenMetadataUri;
        const creator = e.returnValues.creator;

        try {
          const dataInsert = await NFT.create({
            id: token_id + contract_addr,
            tokenID: token_id,
            amountMinted: amountMinted,
            contractAddress: contract_addr,
            tokenMetadataUri: token_metadata_uri,
            creator: creator,
            dateMinted: Date.now(),
            erc721_owner: creator,
            isOnSale: false,
            type: "Artist",
            isERC721: true,
          });
          if (res.status(200).json({ success: true, dataInsert })) {
            res.send(dataInsert);
          }
        } catch (err) {
          console.log(err);
        }
      }
    });
}

export const erc1155NftMinted = async () => {
  // provider for node.js
  const contractInstance = new web3.eth.Contract(erc1155_ABI, erc1155_addr);
  contractInstance.events.allEvents()
    .on('data', async (e) => {
      if (e.event === 'ERC1155NFTMinted') {
        // console.log(e);
        // console.log(e.returnValues.tokenID);
        const token_id = e.returnValues.tokenID;
        const token_metadata_uri = e.returnValues.tokenMetadataUri;
        const creator = e.returnValues.creator;
        const amountMinted = e.returnValues.amountMinted;
        const contract_addr = e.returnValues.contractAddress;

        const artist = await Artist.findAll({
          where: { nftMinted: creator }
        });

        if (artist.length == 0) {
          await Artist.create(
            {
              nftMinted: creator,
            }
          );
        }

        const nft = await NFT.findAll({
          where: { id: token_id + contract_addr }
        });

        if (nft.length == 0) {
          try {
            const dataInsert = await NFT.create({
              id: token_id + contract_addr,
              tokenID: token_id,
              amountMinted: amountMinted,
              contractAddress: contract_addr,
              tokenMetadataUri: token_metadata_uri,
              creator: creator,
              dateMinted: Date.now(),
              erc721_owner: creator,
              isOnSale: false,
              type: "Artist",
              isERC721: true,
            });
            if (res.status(200).json({ success: true, dataInsert })) {
              res.send(dataInsert);
            }
          } catch (err) {
            console.log(err);
          }
        }
        else {
          const amountMinted = await NFT.findAll({
            attributes: ["amountMinted"],
            where: {
              where: { id: token_id + contract_addr }
            }
          })
          const old_amountMinted = amountMinted[0].amountMinted;
          const new_amountMinted = old_amountMinted + amountMinted;

          const amountMintedData = await NFT.update(
            {
              amountMinted: new_amountMinted,
            },
            {
              where: {
                where: { id: token_id + contract_addr }
              }
            }
          )
        }


      }
    });
}

export const erc1155NftCreated = async () => {
  // provider for node.js
  const contractInstance = new web3.eth.Contract(erc1155_ABI, erc1155_addr);
  contractInstance.events.allEvents()
    .on('data', async (e) => {
      if (e.event === 'ERC1155NFTCreated') {
        const token_id = e.returnValues.tokenID;
        const token_metadata_uri = e.returnValues.tokenMetadataUri;
        const creator = e.returnValues.creator;
        const amountMinted = e.returnValues.amountMinted;
        const contract_addr = e.returnValues.contractAddress;
        const publicAllowed = e.returnValues.publicAllowed;

        const artist = await Artist.findOne({
          where: { nftMinted: creator }
        });

        if (artist.length !== 0) {
          await Artist.create(
            {
              nftMinted: creator,
            }
          );
        }

        const nft = await NFT.findOne({
          where: { id: token_id + contract_addr }
        });

        if (nft.length == 0) {
          try {
            const dataInsert = await NFT.create({
              id: token_id + contract_addr,
              tokenID: token_id,
              amountMinted: amountMinted,
              contractAddress: contract_addr,
              tokenMetadataUri: token_metadata_uri,
              creator: creator,
              dateMinted: Date.now(),
              erc721_owner: creator,
              isOnSale: false,
              isERC721: false,
              type: "Artist",
              isPublicAllowed: publicAllowed,
            });
            if (res.status(200).json({ success: true, dataInsert })) {
              res.send(dataInsert);
            }
          } catch (err) {
            console.log(err);
          }
        }

      }
    });
}

export const transferSingle = async () => {
  // provider for node.js
  const contractInstance = new web3.eth.Contract(normal_erc1155_ABI, normal_erc1155_addr);
  contractInstance.events.allEvents()
    .on('data', async (e) => {
      if (e.event === 'TransferSingle') {
        const to = e.returnValues.to;
        const from = e.returnValues.from;
        const id = e.returnValues.id;
        const value = e.returnValues.value;

        const collectorToTransfer = await Collector.findOne({
          where: { collector: to }
        });
        const collectorFromTransfer = await Artist.findOne({
          where: { nftMinted: from }
        });

        if (to !== erc1155_addr && to !== official_addr && to !== zero_addr && from !== collectorFromTransfer) {
          if (!collectorToTransfer) {
            const collectorToTransfer = await Collector.create({
              totalAttributes: getAttributesValue(id, value),
              rank: determineRank(collectorToTransfer.totalAttributes),
            })
          }
          else {
            const attributesValueToAdd = getAttributesValue(id, value),
              collectorToTransfer = await Collector.create({
                totalAttributes: collectorToTransfer.totalAttributes + attributesValueToAdd,
                rank: determineRank(collectorFromTransfer.totalAttributes),
              })
          }
        }

        const collectorNft = await CollectorNFTs.findOne({
          where: { id: id + from + to }
        })
        if (!collectorNft) {
          const collectorNft = await CollectorNFTs.create({
            id: from + to,
            collector: to,
            nft: id + erc1155_addr
          })
        }
      }
    });
}

export const transferBatch = async () => {
  // provider for node.js
  const contractInstance = new web3.eth.Contract(normal_erc1155_ABI, normal_erc1155_addr);
  contractInstance.events.allEvents()
    .on('data', async (e) => {
      if (e.event === 'TransferBatch') {
        const to = e.returnValues.to;
        const from = e.returnValues.from;
        const ids = e.returnValues.ids;
        const values = e.returnValues.value;

        for (const i = 0; i < ids.length; i++) {
          const collectorToTransfer = await Collector.findOne({
            where: { collector: to }
          });
          const collectorFromTransfer = await Artist.findOne({
            where: { nftMinted: from }
          });

          if (to !== erc1155_addr && to !== official_addr && to !== zero_addr && from !== collectorFromTransfer) {
            if (!collectorToTransfer) {
              const collectorToTransfer = await Collector.create({
                totalAttributes: getAttributesValue(id, values[i]),
                rank: determineRank(collectorToTransfer.totalAttributes),
              })
            }
            else {
              const attributesValueToAdd = getAttributesValue(id, values[i]),
                collectorToTransfer = await Collector.create({
                  totalAttributes: collectorToTransfer.totalAttributes + attributesValueToAdd,
                  rank: determineRank(collectorFromTransfer.totalAttributes),
                })
            }
          }

          const collectorNft = await CollectorNFTs.findOne({
            where: { id: id + from + to }
          })
          if (!collectorNft) {
            const collectorNft = await CollectorNFTs.create({
              id: from + to,
              collector: to,
              nft: id + erc1155_addr
            })
          }
        }

      }
    });
}

export const fixedSaleCreated = async () => {
  const contractInstance = new web3.eth.Contract(official_ABI, official_addr);
  contractInstance.events.allEvents()
    .on('data', async (e) => {
      if (e.event === 'FixedSaleCreated') {
        const saleId = e.returnValues.saleId;
        const tokenId = e.returnValues.tokenID;
        const nftContract = e.returnValues.nftContract;
        const isERC721 = e.returnValues.isERC721;
        const amountOnSale = e.returnValues.amountOnSale;
        const fixedPrice = e.returnValues.fixedPrice;

        const nftSale = await NftSale.create({
          id: saleId,
          soldPrice: 0,
          nft: tokenId + nftContract,
        });

        const nft = await NFT.update({
          isOnSale: true,
        }, {
          where: { id: tokenId + nftContract, }
        });

        if (isERC721 == true) {
          await NftSale.create({
            amountOnSale: 1
          }, {
            where: { id: tokenId + nftContract, }
          })
        }
        else {
          await NftSale.create({
            amountOnSale: amountOnSale
          }, {
            where: { id: tokenId + nftContract, }
          })
        }

        const fixedSale = await FixedPriceSale.create({
          id: saleId + tokenId,
          saleId: saleId,
          tokenId: tokenId,
          fixedArtworkSale: saleId,
          fixedPrice: fixedPrice,
          startingDateTime: Date.now(),
          status: "Active"
        });
      }
    });

}

export const fixedSaleSuccessful = async () => {
  const contractInstance = new web3.eth.Contract(official_ABI, official_addr);
  contractInstance.events.allEvents()
    .on('data', async (e) => {
      if (e.event === 'FixedSaleSuccessful') {
        const saleId = e.returnValues.saleId;
        const tokenId = e.returnValues.tokenID;
        const totalPrice = e.returnValues.totalPrice;
        const nftContract = e.returnValues.nftContract;
        const winner = e.returnValues.winner;


        const nftSale = await NftSale.create({
          id: saleId,
          soldPrice: totalPrice,
        });

        const nft = await NFT.update({
          isOnSale: false,
        }, {
          where: { id: tokenId + nftContract, }
        });

        if (isERC721 == true) {
          await NFT.create({
            erc721_owner: winner
          }, {
            where: { id: tokenId + nftContract, }
          })
        }

        const fixedSale = await FixedPriceSale.update({
          id: saleId + tokenId,
          status: "Successful"
        });
      }
    });

}
