var express = require('express');
var router = express.Router();
const ticketsCtrl = require('../controllers/tickets');


router.get('/flights/:id/tickets/new', ticketsCtrl.newTicket);
router.post('/flights/:id/tickets', ticketsCtrl.createTicket);
router.delete('/tickets/:id', ticketsCtrl.deleteTicket);

module.exports = router;