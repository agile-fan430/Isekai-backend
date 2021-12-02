import express from 'express';
import {
  heromodelController,
  upgradeitemController,
  magicitemController,
  userController,
  saleitemController,
  learderboardController
} from '../controllers';

const indexRouter = express.Router();

indexRouter.post("/signup", userController().validate("signup"), userController().signUp);
indexRouter.post("/login", userController().validate("login"), userController().login);

// User
// indexRouter.post('/user-register', userController().registerUser);
indexRouter.post('/update-user', userController().updateUser); // validation
indexRouter.post('/load-user', userController().loadUser); // validation

// Heremodel
indexRouter.post('/create-hero-model', heromodelController().createHeromodel); // validation
indexRouter.post('/load-hero-model', heromodelController().loadHeromodel); // validation
indexRouter.post('/load-hero', heromodelController().loadHero); // validation

// UpgradeItem
// indexRouter.post('/create-upgrade-item', upgradeitemController().buyUpgradeitem);
indexRouter.post('/list-upgrade-item', upgradeitemController().listUpgradeitem); // validation
indexRouter.post('/buy-upgrade-item', upgradeitemController().buyUpgradeitem); // validation
indexRouter.post('/use-upgrade-item', upgradeitemController().useUpgradeitem); // validation

// MagicItem
// indexRouter.post('/create-magic-item', magicitemController().buyMagicitem);
indexRouter.post('/list-magic-item', magicitemController().listMagicitem); //validation
indexRouter.post('/buy-magic-item', magicitemController().buyMagicitem); //validation
indexRouter.post('/use-magic-item', magicitemController().useMagicitem); //validation

// List shop items:
indexRouter.post('/list-shop-item', saleitemController().loadsaleitem);

// load heros that are on the shop
indexRouter.get('/load-shop-hero', heromodelController().loadShopHero);

// load heros by user's address
indexRouter.get('/load-user-heros', heromodelController().loadUserHeros);

// api for leaderboard
indexRouter.get('/load-leader-board', learderboardController().loadLeaderBoard);
indexRouter.post('/create-leader-board', learderboardController().createLeaderBoard);
indexRouter.post('/update-leader-board', learderboardController().updateLeaderBoard);

// api for ECDSA
indexRouter.post('/reward', userController().message_signature)

export default indexRouter;
