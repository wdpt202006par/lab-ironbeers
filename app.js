const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

// 1. creation app express
const app = express();
const punkAPI = new PunkAPIWrapper();

// 2. configuration de l'app
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// 3. middlewares
app.use(express.static(`${__dirname}/public`));

// Register the location for handlebars partials here:
hbs.registerPartials(__dirname + '/views/partials');

//
// 4. Add the route handlers here:
//

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res, next) => {
  punkAPI.getBeers().then(beers => {
    console.log('beers', beers);
    
    res.render('beers', {
      beers: beers
    });
  }).catch(error => {
    console.log(error)
  })
});

app.get('/random-beer', (req, res, next) => {
  punkAPI.getRandom().then(beers => {
    console.log('beers', beers);
    
    res.render('randomBeer', {
      beer: beers[0]
    });
  }).catch(error => {
    console.log(error)
  })
});

// 5. start to listen requests
app.listen(3000, () => console.log('🏃‍ on port 3000'));
