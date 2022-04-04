# mongoose-flight-lab

## Lab 1
### Implementing User Stories

1. I want to view a list of all flights (index view) that displays each flight's airline, airport, flight no., and departure date/time.
```
GET /flights, controller: index
in routes/flights.js: add router.get('/', flightsCtrl.index);
in controllers/flights.js: add function index that renders a view showing all flights using mongoose's Model.find() method
in controllers/flights.js: export index function
in views/flights: $ touch index.ejs
in views/flights/index.ejs: use ejs to output flights into a table or some organized view
```
2. I want to create flights by entering the information on a page (new view) that has a form and submitting it.
```
GET /flights/new, controller: new
in routes/flights.js: add router.get('/new', flightsCtrl.new)
in controllers/flights.js: add function newFlight that renders a view showing an add a flight form
in controllers/flights.js: export new: newFlight function
in views/flights: $ touch new.ejs
in views/flights/new.ejs: use ejs and HTML to render a form for user input to add a new flight
POST /flights, controller: create
in routes/flights.js: add router.post('/', flightsCtrl.create)
in controllers/flights.js: add function create that creates a new flight using input from the form (req.body) and save that flight info to database. Redirect the user back to all flights view
in controllers/flights.js: export create function
in views/flights/new: make sure form tag's attributes read: <form action="/flights"  method="POST"></form> and include an input tag with type="submit"
```
3. I want to be able to access each view via a navigation bar at the top of the page with links to:
    - ALL FLIGHTS, and
    - ADD FLIGHT
```
$ mkdir views/partials
$ touch views/partials/header.ejs
$ touch views/partials/footer.ejs
in views/partials/header.ejs: add HTML boilerplate (end at <main>)
in views/partials/header.ejs: add a navigation bar inside <body> with appropriate links:
<nav>
    <a href="/">Home</a>
    <a href="/flights">All Flights</a>
    <a href="/flights/new">Add Flight</a>
</nav>
in views/partials/footer.ejs: add remaining HTML boilerplate (from </main>)
in all ejs views, include partial views. Include link depends on where the ejs file is compared to partials
<%- include('../partials/header.ejs) %>
<%- include('../partials/footer.ejs) %>
```
### Implementing Bonus User Stories
1. AAU, I want to view the list of flights by departure date in ascending order.
```
in controllers/flights.js: add a mongoose .sort() method to the Model.find() method to sort by departure dates in ascending order
        sort({departs: 'ascending'});
```
2. I want the flights in the list to be displayed using red text if the flight's departure date has passed.
```
in controllers/flights.js: 
```

## Lab 2
### Implementing User Stories

1. When viewing the list of flights, I want to click on a "detail" link displayed next to each flight to view all of the properties for that flight (show view), including each of its destinations.
```
GET /flight/:id, controller: show
in routes/flights.js: router.get('/:id', flightsCtrl.show)
in controllers/flights.js: make function show that renders the specific flight that is selected using mongoose Model.findById method
in controllers/flights.js: export show function
in views/flights: $ touch show.ejs
in views/flights/show.ejs: display the flight details using HTML and ejs

```
2. When viewing the details page (show view) for a flight, I want to be able to add a destination for that flight. Each destination, as defined by the schema above, includes an arrival date/time & one of the established airport codes.  
    Note: Multiple destinations are possible by adding them one at a time.
```

```
3. When viewing the details page (show view) for a flight, I want to see a list of that flight's destinations (airport & arrival)
```

```

### Implementing Bonuses
1. Sort the list of destinations for a flight by the arrival date/time in ascending order.
```

```
2. When viewing the details page (show view) for a flight, I want to be able to delete any current destination for that flight.
```

```
3. When adding a destination for a flight, exclude the airports listed in the <select> that have already been used by other destinations and/or the flight's airport.
```

```