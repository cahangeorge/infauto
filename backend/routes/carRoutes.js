import express from "express"
import { getMyCars, getCarById, deleteCar, updateCar, createCar } from '../controllers/carController.js'
import { protect } from '../middleware/authMiddleware.js'
const router = express.Router()

router
    .route('/')
    .get(getMyCars)
    .post(protect, createCar)
    .delete(protect, deleteCar)

router
    .route('/:id')
    .get(protect, getCarById)
    .put(protect, updateCar)

export default router