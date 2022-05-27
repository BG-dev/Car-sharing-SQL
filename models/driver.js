module.exports = (sequelize, DataTypes) => {
    const Driver = sequelize.define('Driver', {
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
        allowNull: true
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
      tableName: "driver",
      timestamps: false
    })
    return Driver;
  };