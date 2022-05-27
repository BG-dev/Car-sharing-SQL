const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Run extends Model{
    static associate({ Car, Driver, Booking }) {
      Run.belongsTo(Driver, { foreignKey: 'driver_id' })
      Run.hasOne(Car, { foreignKey: 'current_run_id' })
      Run.hasOne(Booking, { foreignKey: 'run_id' })
    }
  }
  Run.init({
    run_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    start_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    driver_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references:{
          model: 'Driver',
          key: 'driver_id'
      }
    },
    start_fuel_level: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    start_mileage: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  },{
    sequelize,
    tableName: "run",
    timestamps: false
  })

  return Run;
  };