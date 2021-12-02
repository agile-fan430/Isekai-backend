import { Upgradeitem } from '../database/models';
import { RefreshToken } from '../database/models';

export const upgradeitemController = () => {
  // Create Hero Model
  const createUpgradeitem = async (req, res, next) => {
    const upgradeInfo = req.body;

    // Insert data to Heromodel table
    try {
      const data = await Upgradeitem.create(
        {
          owner: upgradeInfo.owner,
          type: upgradeInfo.type,
          level: upgradeInfo.level,
          amount: upgradeInfo.amount,
        },
      );

      if (res.status(200).json({ success: true })) {
        res.send(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Load Upgradeitem
  const listUpgradeitem = async (req, res, next) => {
    const { owner } = req.body;

    const header_token = req.header('authorization');
    const user_loggedin = await RefreshToken.findAll({
      where: { token: header_token }
    });

    if (user_loggedin.length !== 0) {
      try {
        const data = await Upgradeitem.findAll({
          where: { owner }
        });
        if (res.status(200).json({ data })) {
          res.send(data);
        }
      } catch (err) {
        next(err);
      }
    }
    else {
      res.status(404).json({ success: false });
    }
  };

  // Buy upgrade item
  const buyUpgradeitem = async (req, res, next) => {

    const upgradeInfo = req.body;
    const row_exist = await Upgradeitem.findAll(
      {
        where:
        {
          owner: upgradeInfo.owner,
          type: upgradeInfo.type,
          level: upgradeInfo.level
        }
      }
    );

    const header_token = req.header('authorization');
    const user_loggedin = await RefreshToken.findAll(
      {
        where: { token: header_token }
      }
    );

    if (user_loggedin.length !== 0) {
      if (row_exist.length == 0) {
        const upgradeInfo = req.body;
        // Insert data to table
        try {
          const data = await Upgradeitem.create(
            {
              owner: upgradeInfo.owner,
              type: upgradeInfo.type,
              level: upgradeInfo.level,
              amount: upgradeInfo.amount,
            },
          );

          if (res.status(200).json({ success: true, data })) {
            res.send(data);
          }
        } catch (err) {
          console.log(err);
        }
      }

      else {
        const amount = await Upgradeitem.findAll({
          attributes: ["amount"],
          where:
          {
            owner: upgradeInfo.owner,
            type: upgradeInfo.type,
            level: upgradeInfo.level
          }
        })

        const oldAmount = amount[0].amount;

        const newAmount = (Number(oldAmount) + Number(upgradeInfo.amount)).toString();
        const data = await Upgradeitem.update(
          {
            amount: newAmount
          },
          {
            where:
            {
              owner: upgradeInfo.owner,
              type: upgradeInfo.type,
              level: upgradeInfo.level
            }
          }
        )
        const newData = await Upgradeitem.findAll(
          {
            where:
            {
              owner: upgradeInfo.owner,
              type: upgradeInfo.type,
              level: upgradeInfo.level
            }
          }
        )
        if (res.status(200).json({ success: true, newData })) {
          res.send(data);
        }
      }
    }
    else {
      res.status(404).json({ success: false });
    }
  };

  // Use upgrade item
  const useUpgradeitem = async (req, res, next) => {

    const upgradeInfo = req.body;
    const row_exist = await Upgradeitem.findAll({
      where:
      {
        owner: upgradeInfo.owner,
        type: upgradeInfo.type,
        level: upgradeInfo.level
      }
    });

    const header_token = req.header('authorization');
    const user_loggedin = await RefreshToken.findAll(
      {
        where: { token: header_token }
      }
    );

    if (user_loggedin.length !== 0) {

      if (row_exist.length == 0) {
        res.status(404).send({ success: false, error_code: 404 });
      }

      else {
        const amount = await Upgradeitem.findAll({
          attributes: ["amount"],
          where:
          {
            owner: upgradeInfo.owner,
            type: upgradeInfo.type,
            level: upgradeInfo.level
          }
        })

        const oldAmount = amount[0].amount;
        const newAmount = (Number(oldAmount) - Number(upgradeInfo.amount)).toString();

        if (Number(newAmount) > 0) {
          const data = await Upgradeitem.update(
            {
              amount: newAmount
            },
            {
              where:
              {
                owner: upgradeInfo.owner,
                type: upgradeInfo.type,
                level: upgradeInfo.level
              }
            }
          )
          const newData = await Upgradeitem.findAll(
            {
              where:
              {
                owner: upgradeInfo.owner,
                type: upgradeInfo.type,
                level: upgradeInfo.level
              }
            }
          )
          // console.log("RESULT-----", updated_data);
          if (res.status(200).json({ success: true, newData })) {
            res.send(data);
          }
        }
        else {
          const data = await Upgradeitem.destroy(
            {
              where:
              {
                owner: upgradeInfo.owner,
                type: upgradeInfo.type,
                level: upgradeInfo.level
              }
            }
          )
          if (res.status(200).json({ success: true })) {
            res.send(data);
          }
        }
      }
    }
    else {
      res.status("404").json({ success: false });
    }
  };

  return { createUpgradeitem, listUpgradeitem, buyUpgradeitem, useUpgradeitem };
};
