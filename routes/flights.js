var express = require('express');
var router = express.Router();
const flightsCtrl = require('../controllers/flights')

/* GET new flight form */
router.get('/new', flightsCtrl.new);
/* GET /flights */
router.get('/', flightsCtrl.index);
/* POST new flight to database */
router.post('/', flightsCtrl.create);

module.exports = router;
