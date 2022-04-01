var express = require('express');
var router = express.Router();
const flightsCtrl = require('../controllers/flights')

/* GET /flights */
router.get('/', flightsCtrl.index);
/* GET new flight form */
router.get('/new', flightsCtrl.new);
/* GET one flight's details */
router.get('/:id', flightsCtrl.show);
/* POST new flight to database */
router.post('/', flightsCtrl.create);

module.exports = router;
