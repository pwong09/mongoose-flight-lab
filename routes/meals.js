var express = require('express');
var router = express.Router();
const mealsCtrl = require('../controllers/meals');

router.post('/flights/:id/meals', mealsCtrl.create)

router.delete('/meals/:id', mealsCtrl.delete);

module.exports = router;