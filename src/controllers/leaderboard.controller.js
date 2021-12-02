import { LeaderBoard } from '../database/models';
import { RefreshToken } from '../database/models';

export const learderboardController = () => {
  const loadLeaderBoard = async (req, res) => {
    const data = await LeaderBoard.findAll(
      {
        attributes: [
          'name',
          'address',
          'rank',
          'point'
        ],
        order: [
          ['points', 'DESC']
        ],
        limit: 100
      }
    );
    res.status(200).json({ success: true, data });
  };

  const createLeaderBoard = async (req, res) => {
    const { address, name, rank, point } = req.body;
    const data = await LeaderBoard.create(
      {
        address: address,
        name: name,
        rank: rank,
        point: point
      }
    );
    res.status(200).json({ success: true, data });
  };

  const updateLeaderBoard = async (req, res) => {
    const { address, name, rank, point } = req.body;
    const data = await LeaderBoard.update(
      {
        point: point
      },
      {
        where: {
          address: address,
          name: name,
          rank: rank
        }
      }
    );
    res.status(200).json({ success: true, data });
  };


  return { loadLeaderBoard, createLeaderBoard, updateLeaderBoard };
}
