const Flight = require('../models/flight');
const Ticket = require('../models/ticket');

module.exports = {
    new: newTicket,
    create
}

function create (req, res){
    console.log(req.params.id)
    req.body['flight'] = req.params.id
    console.log(req.body);
    //locate the flight
    Ticket.create(req.body, function(err, tickets) {
        res.redirect('/flights/show', {
            tickets
        });
    })
}

function newTicket(req, res) {
    console.log(req.params.id)
    Flight.findById(req.params.id, function(err, flight) {
            res.render('flights/:id/tickets/new', {
                title: 'PW Flights Lab',
                flight
            });
        });
};