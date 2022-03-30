import asyncHandler from 'express-async-handler'
import Car from '../models/carModel.js'

const getMyCars = asyncHandler(async (req, res) => {
    const cars = await Car.find({ })

    res.json(cars)
})

const getCarById = asyncHandler(async (req, res) => {
    const car = await Car.findById(req.params.id)

    if(car){
        res.json(car)
    } else {
        res.status(404)
        throw new Error('Car not found')
    }
})

const deleteCar = asyncHandler(async (req, res) => {
    const car = await Car.findById(req.params.id)

    if(car){
        await car.remove()
        res.json({ message: "Car removed" })
    } else {
        res.status(404)
        throw new Error('Car not found')
    }
})

const updateCar = asyncHandler(async (req, res) => {
    const { chassis, registration_number, brand, manufacturing_year, expiry_rca, expiry_itp, expiry_rovinieta } = req.body

    const car = await Car.findById(req.params.id)

    if(car){
        car.chassis = chassis
        car.registration_number = registration_number
        car.brand = brand
        car.manufacturing_year = manufacturing_year
        car.expiry_rca = expiry_rca
        car.expiry_itp = expiry_itp
        car.expiry_rovinieta = expiry_rovinieta

        const updateCar = await car.save()
        res.json(updateCar)
    } else {
        res.status(404)
        throw new Error('Car not found')
    }
})

const createCar = asyncHandler(async (req, res) => {
    const { chassis, registration_number, brand, manufacturing_year, expiry_rca, expiry_itp, expiry_rovinieta } = req.body

    const chassisExists = await Car.findOne({ chassis })

    if(chassisExists){
        res.status(400)
        throw new Error("Car already exists")
    }

    const car = await Car.create({
        user: req.user._id,
        chassis, 
        registration_number, 
        brand, 
        manufacturing_year, 
        expiry_rca, 
        expiry_itp, 
        expiry_rovinieta
    })

    if(car){
        res.status(201).json({
            _id: car._id,
            chassis: car.chassis, 
            registration_number: car.registration_number, 
            brand: car.brand,
            manufacturing_year: car.manufacturing_year, 
            expiry_rca: car.expiry_rca, 
            expiry_itp: car.expiry_itp, 
            expiry_rovinieta: car.expiry_rovinieta
        })
    } else {
        res.status(400)
        throw new Error('Invalid car data')
    }
})

export { getMyCars, getCarById, deleteCar, updateCar, createCar }