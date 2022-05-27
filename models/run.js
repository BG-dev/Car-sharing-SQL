module.exports = (sequelize, DataTypes) => {
    const Run = sequelize.define('Run', {
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
      tableName: "run",
      timestamps: false
    })
    return Run;
  };