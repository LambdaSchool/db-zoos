const router = require("express").Router()
const { checkCarId, checkCarPayload, checkVinNumberValid, checkVinNumberUnique } = require("./cars-middleware")
const db = require("./cars-middleware")

router.get("/api/cars", async (req, res, next) => {
    try {
        const cars = await db.getAll()
        res.status(200).json(cars)
    } catch(err) {
        next(err)
    }
})

router.get("/api/cars/:id", checkCarId(), async (req, res, next) => {
    try {
        const car = await db.getById(req.car.id)
        res.status(200).json(car)
    } catch(err) {
        next(err)
    }
})

router.post("/api/cars", checkCarPayload, checkVinNumberValid(), checkVinNumberUnique(), (req, res, next) => {
    try {
        const car = db.create()
        res.status(201).json(car)
    } catch(err) {
        next(err)
    }
})

router.use((err, req, res, next) => {
    console.log(err)
  
    res.status(500).json({
      message: "Something went wrong",
    })
  })

module.exports = router