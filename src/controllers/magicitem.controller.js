import { Magicitem } from '../database/models';
import { RefreshToken } from '../database/models';

export const magicitemController = () => {
  // Create Hero Model
  const createMagicitem = async (req, res, next) => {
    const magicInfo = req.body;

    // Insert data to Heromodel table
    try {
      const data = await Magicitem.create(
        {
          owner: magicInfo.owner,
          type: magicInfo.type,
          level: magicInfo.level,
          amount: magicInfo.amount,
        },
      );
      if (res.status(200).json({ success: true, data })) {
        res.send(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Load Magicitem
  const listMagicitem = async (req, res, next) => {
    // const {owner} = req.params;
    const { owner } = req.body;

    const header_token = req.header('authorization');
    const user_loggedin = await RefreshToken.findAll({
      where: { token: header_token }
    });

    if (user_loggedin.length !== 0) {
      try {
        const data = await Magicitem.findAll({
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

  // Buy magic item
  const buyMagicitem = async (req, res, next) => {

    const magicInfo = req.body;
    const row_exist = await Magicitem.findAll(
      {
        where:
        {
          owner: magicInfo.owner,
          type: magicInfo.type,
          level: magicInfo.level
        }
      }
    );

    const header_token = req.header('authorization');
    const user_loggedin = await RefreshToken.findAll(
      {
        where: { token: header_token }
      }
    );

    if (user_loggedin !== 0) {
      if (row_exist.length == 0) {
        const magicInfo = req.body;

        // Insert data to table
        try {
          const data = await Magicitem.create(
            {
              owner: magicInfo.owner,
              type: magicInfo.type,
              level: magicInfo.level,
              amount: magicInfo.amount,
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
        const amount = await Magicitem.findAll({
          attributes: ["amount"],
          where:
          {
            owner: magicInfo.owner,
            type: magicInfo.type,
            level: magicInfo.level
          }
        })

        const oldAmount = amount[0].amount;

        const newAmount = (Number(oldAmount) + Number(magicInfo.amount)).toString();
        const data = await Magicitem.update({
          amount: newAmount
        },
          {
            where:
            {
              owner: magicInfo.owner,
              type: magicInfo.type,
              level: magicInfo.level
            }
          }
        )
        const newData = await Magicitem.findAll({
          where:
          {
            owner: magicInfo.owner,
            type: magicInfo.type,
            level: magicInfo.level
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

  // Use magic item
  const useMagicitem = async (req, res, next) => {

    const magicInfo = req.body;
    const row_exist = await Magicitem.findAll({
      where:
      {
        owner: magicInfo.owner,
        type: magicInfo.type,
        level: magicInfo.level
      }
    })

    const header_token = req.header('authorization');
    const user_loggedin = await RefreshToken.findAll(
      {
        where: { token: header_token }
      }
    );

    if (user_loggedin !== 0) {
      if (row_exist.length == 0) {
        res.status(404).send({ success: false, error_code: 404 });
      }
      else {
        const amount = await Magicitem.findAll({
          attributes: ["amount"],
          where:
          {
            owner: magicInfo.owner,
            type: magicInfo.type,
            level: magicInfo.level
          }
        })

        const oldAmount = amount[0].amount;

        const newAmount = (Number(oldAmount) - Number(magicInfo.amount)).toString();
        if (Number(newAmount) > 0) {
          const data = await Magicitem.update({
            amount: newAmount
          },
            {
              where:
              {
                owner: magicInfo.owner,
                type: magicInfo.type,
                level: magicInfo.level
              }
            }
          )
          const newData = await Magicitem.findAll(
            {
              where:
              {
                owner: magicInfo.owner,
                type: magicInfo.type,
                level: magicInfo.level
              }
            }
          )
          if (res.status(200).json({ success: true, newData })) {
            res.send(data);
          }
        }
        else {
          const data = await Magicitem.destroy(
            {
              where:
              {
                owner: magicInfo.owner,
                type: magicInfo.type,
                level: magicInfo.level
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
      res.status(404).json({ success: false });
    }
  };

  return { createMagicitem, listMagicitem, buyMagicitem, useMagicitem };
};
