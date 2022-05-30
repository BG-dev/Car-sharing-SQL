const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class CreditCard extends Model{
    static associate({Driver}) {
      CreditCard.hasOne(Driver, { foreignKey: 'credit_card_id', onDelete: 'cascade', hooks: true })
    }
  }

  CreditCard.init(
    {
      credit_card_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      card_number: {
        type: DataTypes.BIGINT,
        allowNull: false
      },
      card_holder: {
        type: DataTypes.STRING,
        allowNull: false
      },
      card_valid_date : {
        type: DataTypes.DATEONLY,
        allowNull: true
      }
    },{
      sequelize,
      tableName: "creditCard",
      timestamps: false
    }
  )
  
  return CreditCard;
  };