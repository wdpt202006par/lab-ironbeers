const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  res.render('beers');

  const beer25 = punkAPI.getBeers(25);
  punkAPI.then(beersFromApi => console.log('Beers from the database: ', beersFromApi));
  punkAPI.catch(error => console.log(error));
});

app.get('/random-beers', (req, res) => {
  res.render('random-beers');
});

app.listen(3001, () => console.log('🏃‍ on port 3001'));
