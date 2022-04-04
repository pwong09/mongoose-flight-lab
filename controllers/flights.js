const Flight = require('../models/flight');
const Ticket = require('../models/ticket');

module.exports = {
    index,
    create,
    new: newFlight,
    delete: deleteFlight,
    show
}

function index(req, res){
    Flight.find({}, function(err, flights) {
        res.render('flights/index', {
            flights,
            title: 'PW Flights Lab'
        });
    }).
    sort({airline: 'ascending'});
}

function create(req, res){
    console.log(req.body)
    const flight = new Flight(req.body);
    flight.save(function(err){
        if (err) return res.render('flights/new');
        console.log(flight);
        res.redirect('/flights');
    });
}

function newFlight(req, res){
    const flight = new Flight();
    const dt = flight.departs;
    const departsDate = dt.toISOString().slice(0, 16);
    res.render('flights/new', {
        title: 'PW Flights Lab',
        departsDate
    });
}

function show(req, res){
    const flight = new Flight();
    flight.destinations.push({})
    const at = flight.destinations[0].arrivals;
    const arrivalsDate = at.toISOString().slice(0, 16);
    const arrivalAirports = ['AUS', 'DFW', 'DEN', 'LAX', 'SAN'];
    const mealOptions = ['none', 'breakfast', 'lunch', 'dinner', 'vegetarian', 'kosher', 'halal'];
    Flight.findById(req.params.id, function(err, flight){
        Ticket.find({flight: flight._id}, function(err, tickets) {
            res.render('flights/show', {
                title: 'PW Flights Lab',
                flight,
                arrivalsDate,
                arrivalAirports,
                mealOptions,
                tickets
            });
        })

    });
}

function deleteFlight(req, res){
        Flight.findByIdAndDelete(req.params.id, function(err) {
            res.redirect('/');
        });
}