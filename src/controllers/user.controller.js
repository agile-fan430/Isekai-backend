import { body, validationResult } from "express-validator";
import { User } from "../database/models";
import { RefreshToken } from "../database/models";
import { authService } from "../services";
import { decryptRSA } from "../utils";
import { errorCodes, errorMessages } from "../constants/errors";
import { userValidation } from "../validations";

const keccak256 = require('keccak256');
const EthCrypto = require("eth-crypto");
const signerIdentity = EthCrypto.createIdentity();

var nonce = 0;
export const userController = () => {
  // Create Hero Model
  const registerUser = async (req, res, next) => {
    const userInfo = req.body;
    console.log('User info', userInfo);
    // Insert data to Heromodel table
    try {
      const data = await User.create(
        {
          wallet_addr: userInfo.wallet_addr,
          name: userInfo.name,
          email: userInfo.email,
          password: userInfo.password,
          coin_collected: userInfo.coin_collected,
          common_silver_shard: userInfo.common_silver_shard,
          common_gold_shard: userInfo.common_gold_shard,
          powered_silver_shard: userInfo.powered_silver_shard,
          powered_gold_shard: userInfo.powered_gold_shard,
        }
      );
      if (res.status(200).json({ success: true, data })) {
        res.send(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const updateUser = async (req, res, next) => {
    const userInfo = req.body;

    const header_token = req.header('authorization');
    const user_loggedin = await RefreshToken.findAll(
      {
        where: { token: header_token }
      }
    );

    // Insert data to Heromodel table
    if (user_loggedin.length !== 0) {
      try {
        const data = await User.update(
          {
            coin_collected: userInfo.coin_collected,
            common_silver_shard: userInfo.common_silver_shard,
            common_gold_shard: userInfo.common_gold_shard,
            powered_silver_shard: userInfo.powered_silver_shard,
            powered_gold_shard: userInfo.powered_gold_shard,
          },
          {
            where: { wallet_addr: userInfo.wallet_addr }
          }
        );
        const newData = await User.findAll(
          {
            where: { wallet_addr: userInfo.wallet_addr }
          }
        );
        res.status(200).json({ success: true });
        // if (res.status(200).json({ success: true, newData })) {
        //   res.send(data);
        // }
      } catch (err) {
        console.log(err);
      }
    }
    else {
      res.status(204).json({ success: false });
    }

  };

  // Load User data
  const loadUser = async (req, res, next) => {
    const userInfo = req.body;

    const header_token = req.header("authorization");
    console.log(header_token);
    const user_loggedin = await RefreshToken.findAll(
      {
        where: { token: header_token }
      }
    );
    if (user_loggedin.lenth !== 0) {
      try {
        const data = await User.findOne({
          where: { wallet_addr: userInfo.wallet_addr }
        });
        if (res.status(200).json({ data })) {
          res.send(data);
        }
      }
      catch (err) {
        next(err);
      }
    }
    else {
      res.status(204).json({ success: false });
    }
  };


  // validation
  const validate = method => {
    switch (method) {
      case "signup":
        {
          return [
            body("name", errorMessages.FULLNAME_REQUIRED).exists(),
            body("password").exists().withMessage(errorMessages.PASSWORD_REQUIRED).custom(userValidation().checkPassword),
            // body("passwordConfirmation").exists().withMessage(errorMessages.PW_CONFIRMATION_REQUIRED).custom((value, {req}) => {
            //   return userValidation().checkPasswordConfirmation(req.body.password, value);
            // }),
            body("email").exists().withMessage(errorMessages.PERSONAL_EMAIL_REQUIRED).isEmail().withMessage(errorMessages.PERSONAL_EMAIL_INVALID)
          ];
        }
      case "login":
        {
          return [
            body("email").exists().withMessage(errorMessages.EMAIL_REQUIRED).isEmail().withMessage(errorMessages.EMAIL_INVALID).custom(userValidation().checkEmail),
            body("password").exists().withMessage(errorMessages.PASSWORD_REQUIRED).custom(userValidation().checkPassword)
          ];
        }
      default:
        return null;
    }
  };


  const signUp = async (req, res, next) => {
    const { wallet_addr, name, email, password } = req.body;
    try {
      // throw an error when validation failed
      validationResult(req).throw();

      const data = await User.create({ wallet_addr, name, email, password: password });
      // TODO: send verification mail
      res.status(200).json({ success: true, data });
    } catch (err) {
      next(err);
    }
  };

  const login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({
        where: {
          email: email
        }
      });

      if (!user) {
        const err = new Error(errorMessages.AUTH_FAILED);
        err.status = errorCodes.AUTH_FAILED;
        throw err;
      }
      const decryptedPassword = decryptRSA(password);
      if (decryptedPassword !== decryptRSA(user.password)) {
        const err = new Error(errorMessages.AUTH_FAILED);
        err.status = errorCodes.AUTH_FAILED;
        throw err;
      }
      // TODO: check email is verified

      // Generate an access token
      const accessToken = authService().issue({ userId: user.id });
      // Generate refresh token
      const refreshToken = await authService().generateRefreshToken({ userId: user.id });

      const userObj = user.toJSON();
      delete userObj.password;
      userObj.accessToken = accessToken;
      userObj.refreshToken = refreshToken.token;
      res.status(200).json({ success: true, data: userObj });
    } catch (err) {
      next(err);
    }
  };

  // Token Validation:
  const token_validation = async (req, res, next) => {
    const user_req_info = req.body;
    try {
      const user_available = await RefreshToken.findAll(
        {
          where: {
            token: user_req_info.refreshToken
          }
        }
      );
      // res.status(200).json({ success: true, data });
      return [body("token").exists()];
    } catch (err) {
      console.log(err);
    }
  };

  // ECDSA
  const message_signature = async (req, res, next) => {
    const address = req.body.address;
    try {
      const data = await User.findOne({
        attributes: [
          'coin_collected',
          'common_silver_shard',
          'common_gold_shard',
          'powered_silver_shard',
          'powered_gold_shard'
        ],
      },
        {
          where: { wallet_addr: address }
        }
      );
      const message = EthCrypto.hash.keccak256([
        { type: "uint256", value: data.coin_collected },
        { type: "uint256", value: data.common_silver_shard },
        { type: "uint256", value: data.common_gold_shard },
        { type: "uint256", value: data.powered_silver_shard },
        { type: "uint256", value: data.powered_gold_shard },
        { type: "uint256", value: nonce }
      ]);
      const signature = EthCrypto.sign(signerIdentity.privateKey, message);
      const response = {
        message: message,
        signature: signature,
        public_key: signerIdentity.address,
        nonce: nonce
      }
      // data.dataValues.nonce = nonce;
      nonce++;
      res.send(response);
    } catch (e) {
      console.log(e);
    }
  };

  return { registerUser, updateUser, loadUser, validate, signUp, login, token_validation, message_signature };
};
