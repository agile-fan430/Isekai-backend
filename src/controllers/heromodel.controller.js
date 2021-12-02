import { Heromodel } from '../database/models';
import { Magicitem } from '../database/models';
import { Upgradeitem } from '../database/models';
import { RefreshToken } from "../database/models";

// const contractABI = require("../contract-abi.json");
// const contractAddress = "0x5c0E7Dfde1868A26D923725419861af5387B7fC7";
// const Web3 = require('web3');
// const web3 = new Web3('https://rinkeby.infura.io/v3/ec74d1b14a7948388274b61bbd842489');
// const { create } = require('ipfs-http-client')
// const ipfsClient = create("http://167.99.110.177:5001");

export const heromodelController = () => {
  // Create Hero Model
  const createHeromodel = async (req, res, next) => {

    const heroInfo = req.body;

    // const header_token = req.header("authroization");
    // const user_loggedin = await RefreshToken.findAll(
    //   {
    //     where: { token: header_token }
    //   }
    // );

    // Insert data to Heromodel table
    // if (user_loggedin.length !== 0) {
    try {
      const data = await Heromodel.create(
        {
          tokenId: heroInfo.tokenId,
          owner: heroInfo.owner,
          name: heroInfo.name,
          rarity: heroInfo.rarity,
          power: heroInfo.power,
          magic: heroInfo.magic,
          weapon: heroInfo.weapon,
          price: heroInfo.price,
          category: heroInfo.category,
          isInShop: heroInfo.isInShop
        },
      );
      if (res.status(200).json({ success: true, data })) {
        res.send(data);
      }
    } catch (err) {
      console.log(err);
    }
    // }
    // else {
    //   res.status(401).json({ success: false });
    // }
  };

  // Load HeroModel
  const loadHeromodel = async (req, res, next) => {
    const { owner } = req.body;

    const header_token = req.header("authroization");
    const user_loggedin = await RefreshToken.findAll(
      {
        where: { token: header_token }
      })
    try {
      const data = await Heromodel.findAll({
        where: { owner }
      });
      if (res.status(200).json({ data })) {
        res.send(data);
      }
    } catch (err) {
      next(err);
    }
  };
  // return { createHeromodel, loadHeromodel};

  // Load Hero Model and items
  const loadHero = async (req, res, next) => {
    const { owner } = req.body;
    const header_token = req.header("authroization");
    const user_loggedin = await RefreshToken.findAll(
      {
        where: { token: header_token }
      }
    );

    if (user_loggedin.length !== 0) {
      try {
        const herodata = await Heromodel.findAll({ where: { owner } });
        const magicdata = await Magicitem.findAll({ where: { owner } });
        const upgradedata = await Upgradeitem.findAll({ where: { owner } });
        if (res.status(200).json({ herodata, magicdata, upgradedata })) {
          res.send({ HeroData: herodata, MagicData: magicdata, Upgrade: upgradedata });
        }
      } catch (err) {
        next(err);
      }
    }
    else {
      res.status(401).json({ success: false });
    }
  };


  // Load heros that are on the shop
  const loadShopHero = async (req, res, next) => {
    const { category } = req.query;

    // const header_token = req.header("authroization");
    // const user_loggedin = await RefreshToken.findAll(
    //   {
    //     where: { token: header_token }
    //   })
    // if (user_loggedin.length !== 0) {
    try {
      const data = await Heromodel.findAll({
        attributes: [
          'tokenId',
          'name',
          'rarity',
          'power',
          'magic',
          'weapon',
          'price'
        ],
        where: {
          isInShop: true,
          category: category
        }
      });
      if (data.length != 0) {
        res.status(200).json({ succeess: true, data });
      }
      else {
        res.status(204).json({ success: false, data });
      }
    } catch (err) {
      next(err);
    }
    // }
    // else {
    //   res.status(401).json({ success: false });
    // }
  };


  // Load heros by user's address
  const loadUserHeros = async (req, res, next) => {
    const { address } = req.query;

    // const header_token = req.header("authroization");
    // const user_loggedin = await RefreshToken.findAll(
    //   {
    //     where: { token: header_token }
    //   })
    // if (user_loggedin.length !== 0) {
    try {
      const data = await Heromodel.findAll({
        attributes: [
          'tokenId',
          'name',
          'rarity',
          'power',
          'magic',
          'weapon',
          'price'
        ],
        where: {
          owner: address
        }
      });
      if (data.length != 0) {
        res.status(200).json({ succeess: true, data });
      }
      else {
        res.status(204).json({ success: false, data });
      }
    } catch (err) {
      next(err);
    }
    // }
    // else {
    //   res.status(401).json({ success: false });
    // }
  };
  return { createHeromodel, loadHeromodel, loadHero, loadShopHero, loadUserHeros };
};
