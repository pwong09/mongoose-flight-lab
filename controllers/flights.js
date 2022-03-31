const Flight = require('../models/flight');

module.exports = {
    index,
    create,
    new: newFlight
}

function index(req, res){
    Flight.find({}, function(err, flights) {
        res.render('flights/index', {
            flights,
            title: 'PW Flights Lab'
        });
    });
}

function create(req, res){
    const flight = new Flight(req.body);
    flight.save(function(err){
        if (err) return res.render('flights/new');
        console.log(flight);
        res.redirect('/flights');
    })
}

function newFlight(req, res){
    const newFlight = new Flight();
    const dt = newFlight.departs;
    const departsDate = dt.toISOString().slice(0, 16);
    res.render('flights/new', {
        title: 'PW Flights Lab',
        departsDate
    });
}