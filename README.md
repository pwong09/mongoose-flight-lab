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
POST /flights/:id/destinations, controller: create
$ touch routes/destinations.js
$ controllers/destinations.js
in server.js: add a new destinationsRouter 
in server.js: add app.use('/', destinationsRouter) 
in routes/destinations.js: router.post('/flights/:id/destinations', destinationsCtrl.create)
in routes/destinations.js: require controllers/destinations and export module
in controllers/destinations.js: make function create using req.body and remember to save to Flight. Redirect to same page as the flight where you added the destination
in controllers/destinations.js: export the function
in views/flights/show.ejs: add the HTML form to add a destination and arrival date, use ejs where necessary 
```
3. When viewing the details page (show view) for a flight, I want to see a list of that flight's destinations (airport & arrival)
```
My method below actually makes a small table of the destinations and arrival dates, not a list.
in views/flights/show.ejs: use HTML and ejs to add a table with headers for airports, arrival date, and arrival time. Use a forEach method to get the individual info per flight

```

### Implementing Bonuses
1. Sort the list of destinations for a flight by the arrival date/time in ascending order.
```
in views/flights/show.ejs: use ejs and sort method to sort the destinations by arrival date/time before adding the info to the table
```
2. When viewing the details page (show view) for a flight, I want to be able to delete any current destination for that flight.
```
DELETE /destinations/:id, controller: delete
in routes/destinations.js: router.delete('/destinations/:id', destinationsCtrl.delete)
in controllers/destinations.js: make a delete function, use mongoose's findById and .remove() methods
in controllers/destinations.js: export the function
in views/flights/show.ejs: add a HTML form to delete - be sure to have method-override installed to the repo and update form's action accordingly
```
3. When adding a destination for a flight, exclude the airports listed in the select that have already been used by other destinations and/or the flight's airport.
```
in controllers/flights.ejs: add an array of possible arrival airports to the show function
in views/flights/show.ejs: use ejs and call the array to match the correspond flight's departure airport. Push non-matching airports to a new array, then use a forEach function to add those airports into the <select>'s options
```
## Lab 3
### linking two Models
1. Create a ticketSchema that will be compiled into a Ticket Model
```
$ touch models/ticket.js
$ touch routes/tickets.js
$ touch controllers/tickets.js
in models/ticket.js: make a new Schema named ticketSchema, export it as a mongoose model
in routes/tickets.js: require express and express.Router(), then export router
in controllers/tickets.js: require both Ticket and Flight models 
in server.js: add a ticketsRouter variable and call it in a new app.use('/')
```
2. Modify the show view for a flight to render a list or table of tickets that have been created for that flight
```
in controllers/flights.js: inside the show function, add code to grab info from the Ticket Model. Use the flight's id or req.params.id to match for the correct tickets
in views/flights/show.ejs: use HTML and ejs to loop through the tickets and show the ticket's seat and price
```
3. Display a New Ticket link, styled like a button, that leads to a form to add a new ticket to the corresponding flight. When the form is submitted, the user should be redirected to the show page and a new ticket should render in the tickets table
```
$ mkdir views/tickets
$ touch views/tickets/new.ejs
in routes/tickets.js: router.get('/flights/:id/tickets/new', ticketsCtrl.newTicket);
in routes/tickets.js: router.post('/flights/:id/tickets', ticketsCtrl.createTicket);
in controllers/tickets.js: newTicket function should render the tickets/new.ejs page
in controllers/tickets.js: createTicket function should create a ticket with seat and price from the form. Add code to also include the flight's id number to the new ticket
in controllers/tickets.js: export all functions
in views/tickets/new.ejs: use HTML and ejs to add a form to add a ticket, ensure the action link corresponds with the POST route
```
### Implementing Bonus
- Delete a ticket
```
in routes/tickets.js: router.delete('/tickets/:id', ticketsCtrl.deleteTicket);
in views/flights/show.ejs: use HTML and ejs to add a delete form, add a name and value attribute
in controllers/tickets.js: deleteTicket function should delete a ticket based on the criteria taken from the delete form
```
### Implementing Unique User Stories (PW's ideas)
1. In each individual flight's page, add a delete button to delete that flight and take the user back to the main flights view.
```
DELETE /flights/:id, controller: delete
in routes/flights.js: router.delete('/:id', flightsCtrl.delete)
in controllers/flights.js: add a deleteOne function
in controllers/flights.js: export delete function
in views/flights/show.ejs: add a HTML form to delete the flight, adjust the form's action accordingly
```
2. Airlines offer different meal options to passengers! Make a new Schema for all possible meal options. Embed the subdocument to the Flight Model.
```
in models/flight.js add the mealSchema, set default to 'none'
```
3. In the Home page, let the user add meal options to each airline
```
POST /flights/:id/meals, controller: create
$ touch routes/meals.js
$ touch controllers/meals.js
in server.js: add a mealsRouter
in server.js: add app.use('/', mealsRouter)
in routes/meals.js: router.post('/:id/meals', mealsCtrl.create)
in controllers/meals.js: add a create function to save the meal option to the corresponding flight
in controllers/meals.js: export create function
in views/flights/show.ejs: use HTML and ejs to add a form to add meal options
style the two forms so it's that they are two separate forms
```
4. In each individual flight's page, show a list of the meal offerings for that flight
```
in views/flights/show.ejs: use ejs to grab the meal options and show them on the view
```
5. In each individual flight's page, add a delete option for the meal offering
```
DELETE /meals/:id 
in routes/meals.js: router.delete('/meals/:id', mealsCtrl.delete)
in controllers/meals.js: add a deleteOne function to delete a meal option from the corresponding flight
in controllers/meals.js: export the delete function
in views/flights/show.ejs: use HTML and ejs to add a form to delete each meal option
```
6. Limit users' meal options based on what is already offered on the flight
```
in controllers/flights.js: add an array of all possible meal options
in views/flights/show.ejs: in the section where you display meal options, make an array of meal options that have already been chosen
in views/flights/show.ejs: in the form to add a meal, compare the two arrays and only display options that have not already been chosen
```