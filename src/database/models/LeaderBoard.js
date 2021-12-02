const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class LeaderBoard extends Model {
  }
  LeaderBoard.init(
    {
      address: DataTypes.STRING,
      name: DataTypes.STRING,
      rank: DataTypes.STRING,
      point: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'LeaderBoard',
      timestamps: false,
      freezeTableName: true,
      indexes: [
        {
          fields: ['address'],
        },
      ],
    }
  );
  return LeaderBoard;
};
