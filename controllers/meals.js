const Flight = require('../models/flight');

module.exports = {
    create,
    delete: deleteMeal
}

function create(req, res){
    Flight.findById(req.params.id, function(err, flight) {
        flight.meals.push(req.body);
        console.log(req.body)
        flight.save(function(err){
            res.redirect(`/flights/${req.params.id}`);
            console.log('saved')
        });
    });
}

function deleteMeal(req, res){

}