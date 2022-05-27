const express = require("express"); 
const db = require('../models')
const Car = db.Car
const Op = db.Sequelize.Op;

const router = express.Router()

router.get('/lowfuel', async (req, res) => {
    try {
        const cars = await Car.findAll({ 
            where: {
                current_run_id: {
                    [Op.not]: null
                },
                fuel_level: {
                    [Op.lt]: 25
                } 
            }
        })
        console.log(cars)
        res.status(200).send({
            message: 'Cars successfully got from the database',
            cars: cars
        })   
    } catch (error) {
        console.log(error)
    }  
})

module.exports = router