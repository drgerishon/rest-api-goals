const express = require("express")
const { getGoals, createGoals, updateGoals, deleteGoals } = require("../controllers/goalsController")

const router = express.Router()

const { protect } = require('../middleware/authMiddleware')

router.get('/', protect, getGoals)

router.post('/', protect, createGoals)

router.put('/:id',protect,  updateGoals)

router.delete('/:id', protect, deleteGoals)


module.exports = router