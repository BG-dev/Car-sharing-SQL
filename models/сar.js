module.exports = (sequelize, DataTypes) => {
  const Car = sequelize.define('Car', {
    vin: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    registration_number: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: false
    },
    model: {
      type: DataTypes.STRING,
      allowNull: false
    },
    production_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fuel_level: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    mileage: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    current_run_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references:{
        model: 'Run',
        key: 'run_id'
      }
    },
    geo_latitude: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    geo_longitude: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
  },{
    tableName: "car",
    timestamps: false
  })
  return Car;
};