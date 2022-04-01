const Flight = require('../models/flight');

module.exports = {
    index,
    create,
    new: newFlight,
    show
}

function index(req, res){
    Flight.find({}, function(err, flights) {
        res.render('flights/index', {
            flights,
            title: 'PW Flights Lab'
        });
    }).
    sort({departs: 'ascending'})
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

function show(req, res){
    Flight.findById(req.params.id, function(err, flight){
        console.log(`show ${req.params.id}`);
        res.render('flights/show', {
            title: 'PW Flights Lab',
            flight
        });
    });
}