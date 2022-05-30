const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Booking extends Model{
    static associate({Run, Car}) {
      Booking.belongsTo(Car, { foreignKey: 'vin_id'})
      Booking.belongsTo(Run, { foreignKey: 'run_id'})
    }
  }

  Booking.init(
    {
      booking_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      vin_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references:{
            model: 'Car',
            key: 'vin'
        }
      },
      run_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references:{
            model: 'Run',
            key: 'run_id'
        }
      },
      finish_fuel_level: {
        type: DataTypes.DOUBLE,
        allowNull: false
      },
      finish_mileage: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },{
      sequelize,
      tableName: "booking",
      timestamps: false
    }
  )
  
  return Booking;
  };