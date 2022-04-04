const Flight = require('../models/flight');
const Ticket = require('../models/ticket');

module.exports = {
    newTicket,
    createTicket,
    deleteTicket
}

function createTicket (req, res){
    req.body['flight'] = req.params.id
    console.log(req.body);
    Ticket.create(req.body, function(err, tickets) {
        res.redirect(`/flights/${req.params.id}`)
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

function deleteTicket(req, res) {
    console.log(req.body)
    Ticket.deleteOne(req.body, function(err, ticket) {
            res.redirect(`/flights/${req.params.id}`);
        });
}