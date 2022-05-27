module.exports = (sequelize, DataTypes) => {
    const CreditCard = sequelize.define('CreditCard', {
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
      tableName: "creditCard",
      timestamps: false
    })
    return CreditCard;
  };