const express = require("express"); 
const db = require('../models');
const Driver = db.Driver
const Run = db.Run 
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

router.get('/unauthorized', async (req, res) => {
    try {
        const cars = await Car.findAll({ 
            include: [
                {
                    model: Run,
                    include:[
                        {
                            model: Driver,
                            where: {
                                credit_card_id: {
                                    [Op.not]: null
                                }
                            }
                        }
                    ]
                }
            ],
            where: {
                status: "Reserved",
            }
        })
        res.status(200).send({
            message: 'Cars successfully got from the database',
            cars: cars
        })   
    } catch (error) {
        console.log(error)
    }  
})

router.post('/', async (req, res) => {
    try {
        const newCarData = req.body.newCar
        console.log(newCarData)

        const car = await Car.create({...newCarData})

        res.status(200).send({
            message: 'Car successfully added to the database',
            car
        })   
    } catch (error) {
        console.log(error)
    }  
})

router.put('/carservice', async (req, res) => {
    try {
        await Car.update(
            { 
                status: "In Service" 
            },
            {
                where: {
                    [Op.or]: [
                        {
                            production_date:{
                                [Op.lt]: '2017-01-01'
                            }
                        },
                        {
                            mileage:{
                                [Op.gt]: 100000
                            }
                        }
                    ]
                }
            }
        )

        res.status(200).send({
            message: 'Car successfully updated to the database'
        })   
    } catch (error) {
        console.log(error)
    }  
})

module.exports = router