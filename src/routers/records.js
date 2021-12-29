const router = require('express').Router()
const { FindRecords } = require('../controllers/records')

//POST
router.post('/records', FindRecords)

module.exports = router
