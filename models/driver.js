const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Driver extends Model{
    static associate({Run, CreditCard}) {
      Driver.hasOne(Run, { foreignKey: 'driver_id' })
      Driver.hasOne(CreditCard, { foreignKey: 'credit_card_id' })
    }
  }
  Driver.init(
    {
      driver_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      license_number: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      second_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      credit_card_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references:{
            model: 'CreditCard',
            key: 'credit_card_id'
        }
      }
    },{
      sequelize,
      tableName: "driver",
      timestamps: false
    }
  )
  return Driver;
  };