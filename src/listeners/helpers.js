// import { Address, BigDecimal, BigInt, Bytes, json } from "@graphprotocol/graph-ts";
// import { decimal } from "@protofire/subgraph-toolkit";
// import { Erc1155Contract } from "../generated/Erc1155contract/Erc1155Contract";
// import { CollectorNfts } from "../generated/schema";

export const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
export const AMOUNT_MINTED_ERC721 = 1;
// export var ERC1155COLLECTIBLE_ADDRESS = hexStringToLowerCase(
//   "0x5108786b33fa3204a91C013A7672f6A8aF03Fc71"
// );
// export var ARTIST_NFT_ADDRESS = hexStringToLowerCase(
//   "0x41aA0e5Cfa90ebf051BFC77071E95c5D8471c036"
// );

// export var OFFICIAL_MARTKETPLACE_ADDRESS = hexStringToLowerCase(
//   "0x4760881F6D305Bb85caC2c7D04F21595F64be02D"
// );
const ERC1155COLLECTIBLE_ADDRESS = "0x5108786b33fa3204a91C013A7672f6A8aF03Fc71";
const ARTIST_NFT_ADDRESS = "0x41aA0e5Cfa90ebf051BFC77071E95c5D8471c036";
const OFFICIAL_MARTKETPLACE_ADDRESS = "0x4760881F6D305Bb85caC2c7D04F21595F64be02D";


/**
 * Ether default value initialized as 1 Ether = 1000000000000000000 wei
 */
// export var ETH = BigInt.fromString("1000000000000000000");


/**
 * Helper function to get Attributes Values.
 * 
 */
 export function getAttributesValue(id, value) {
  let output = "";

  if (id == "1000001") output = "23";
  else if (id == "1000002") output = "22";
  else if (id == "1000003") output = "16";
  else if (id == "1000004") output = "19";
  else if (id == "1000005") output = "23";
  else if (id == "1000006") output = "21";
  else if (id == "1000007") output = "24";
  else if (id == "1000008") output = "21";
  else if (id == "1000009") output = "19";
  else if (id == "2000001") output = "26";
  else if (id == "2000002") output = "44";
  else if (id == "2000003") output = "32";
  else if (id == "2000004") output = "38";
  else if (id == "2000005") output = "46";
  else if (id == "2000006") output = "42";
  else if (id == "2000007") output = "48";
  else if (id == "2000008") output = "42";
  else if (id == "2000009") output = "38";
  else output = "0";

  return (BigInt.fromString(output).times(BigInt.fromString(value))).toString();
}

/**
 * Helper function to get rank 
 * 
 */
 export function determineRank(value) {
  let output = "";

  if (value.lt(BigInt.fromString("19"))) output = "Peasant";
  else if (value.ge(BigInt.fromString("19")) && value.lt(BigInt.fromString("50"))) output = "Squire";
  else if (value.ge(BigInt.fromString("50")) && value.lt(BigInt.fromString("250"))) output = "Knight";
  else if (value.ge(BigInt.fromString("250"))) output = "GrandWizard";
  else output = "";

  return output;
}

/**
 * Helper function to Update Balance for a token on transfer
 * 
 */
//  export function updateBalance(to: Address, from: Address, id: BigInt, amount: BigInt, exists: boolean): BigDecimal {
//   let output = BigDecimal.fromString("0");
//   let contract = Erc1155Contract.bind(Address.fromString(ERC1155COLLECTIBLE_ADDRESS));

//   let collectorNftFrom = CollectorNfts.load(id.toString().concat(from.toHexString()));
//   if(collectorNftFrom){
//     collectorNftFrom.balance = (contract.balanceOf(from,id)).toBigDecimal();
//     collectorNftFrom.save();
//   }

//   let collectorNftto = CollectorNfts.load(id.toString().concat(to.toHexString()));
//   if(exists == true){
//     output = collectorNftto.balance.plus(amount.toBigDecimal());
//   }
//   else{
//     output = (contract.balanceOf(to,id)).toBigDecimal();
//   }
    
//   return output;
// }
