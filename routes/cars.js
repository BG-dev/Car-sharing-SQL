const express = require("express"); 
const { sequelize } = require("../models");
const db = require('../models');
const Driver = db.Driver
const Run = db.Run 
const Booking = db.Booking 
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

router.put('/moveusedcar', async (req, res) => {
    try {
        const cars = await Car.findAll(
            {
                
                include: [
                    {
                        model: Booking,
                        attributes: []
                    }
                ],
                attributes:['vin'],
                group: ['vin'],
                having: db.Sequelize.literal('count(vin) > 2'),
                where: {
                    status: {
                        [Op.notIn]:[
                            "In use",
                            "Reserved"
                        ]
                    }
                }
                
            }
        )

        await Car.update(
            {
                geo_latitude: 53.88828,
                geo_longitude: 27.54426
            },
            {
                where:{
                    vin: cars.map(car => car.vin)   
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

router.delete('/:vin', async (req, res) => {
    try {
        const vin = req.params.vin

        await Car.destroy(
            {
                where: {
                    vin
                }
            }
        )

        res.status(200).send({
            message: 'Car successfully deleted from the database'
        })   
    } catch (error) {
        console.log(error)
    }  
})

module.exports = router