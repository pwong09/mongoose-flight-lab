const Flight = require('../models/flight');
const Ticket = require('../models/ticket');

module.exports = {
    newTicket,
    createTicket
}

function createTicket (req, res){
    console.log(req.params.id)
    req.body['flight'] = req.params.id
    console.log(req.body);
    Ticket.create(req.body);
    Flight.findById(req.params.id, function(err, flight) {
        res.redirect(`flights/show`)
    });
}

function newTicket(req, res) {
    console.log(`Hi I'm id: ${req.params.id}`);
    Flight.findById(req.params.id, function(err, flight) {
            res.render('tickets/new', {
                title: 'PW Flights Lab',
                flight
            });
        });
    }