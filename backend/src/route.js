const express = require('express')

//import methods
const {getPolices, updatePolicy, getPolicyById, getChartData} = require('../src/controller/policy')

const router = express.Router()

router.route('/policy').get(getPolices)
router.route('/policy/:id').put(updatePolicy).get(getPolicyById)
router.route('/chart').get(getChartData)

module.exports = router;