module.exports = (sequelize, DataTypes) => {
    const Booking = sequelize.define('Booking', {
      booking_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      vin: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: 'Car',
            key: 'vin'
        }
      },
      run_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
      tableName: "booking",
      timestamps: false
    })
    return Booking;
  };