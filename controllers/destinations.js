const Flight = require('../models/flight');

module.exports = {
    create,
    delete: deleteDestination
}

function create(req, res){
    Flight.findById(req.params.id, function(err, flight) {
        flight.destinations.push(req.body);
        flight.save(function(err){
            res.redirect(`/flights/${req.params.id}`);
        });
    });
}

function deleteDestination(req, res){
    Flight.findById(req.params.id, function(err, flight){
        flight.destinations[0].remove();
        flight.save(function(err) {
            res.redirect(`/flights/${req.params.id}`);
        });
    });
}