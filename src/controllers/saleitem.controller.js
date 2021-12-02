import { Salemagicitem} from '../database/models';
import { Saleupgradeitem} from '../database/models';
import {RefreshToken} from '../database/models';


export const saleitemController = () => {
  
  // Load Hero Model and items
  const loadsaleitem = async (req, res, next) => {

    const header_token = req.header('authorization');
    const user_loggedin = await RefreshToken.findAll({
      where: {token: header_token}
    });

    if (user_loggedin.length !== 0){
      try {
        const salemagicdata = await Salemagicitem.findAll();
        const saleupgradedata = await Saleupgradeitem.findAll();
        if (res.status(200).json({ salemagicdata, saleupgradedata })) {
          res.send({SalemagicData: salemagicdata, SaleUpgrade: saleupgradedata});
        }
      } catch (err) {
        next(err);
      }
    }
    else {
      res.status(404).json({success: false});
    }    
  };

  return { loadsaleitem };
};
