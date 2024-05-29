// Import Express
const express = require('express');
const morgan = require('morgan');

// Create an Express app
const app = express();

app.use(morgan('dev'));

// Listen for requests on port 3000
app.listen(3000, () => {
  console.log('Listening on port 3000')
});

// 1. Be Polite, Greet the User
app.get('/greeting/:username', (req, res) => {
  console.log(req.params);

  res.send(`Hello ${req.params.username}! How are you today?`)
});

// 2. Rolling the Dice
app.get('/roll/:number', (req, res) => {
  const diceRoll = parseInt(req.params.number, 10);
  console.log(req.params.number)
  if (!isNaN(diceRoll)) {
    const rollNumber = Math.floor(Math.random() * 20)
    res.send(`Your roll is ${rollNumber}`);
  } else {
    res.send('You must specify a number.')
  }
});

// 3. I Want THAT One!
const collectibles = [
  { name: 'shiny ball', price: 5.95 },
  { name: 'autographed picture of a dog', price: 10 },
  { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
];

let newCollection = [];

app.get('/collectibles/:index', (req, res) => {
  const collection = parseInt(req.params.index, 10);
  if(!isNaN(collection) && collection >= 0 && collection <= collectibles.length){

      const collectName = collectibles[collection].name;
      const price = collectibles[collection].price;
      // // console.log(collectName, price);
      res.send(`I see you like the ${collectName}? For ${price}`)
    
  } else {
    res.send('This item is not yet in stock. Check back soon');
  }
})


// 4. Filter Shoes by Query Parameters
const shoes = [
  { name: "Birkenstocks", price: 50, type: "sandal" },
  { name: "Air Jordans", price: 500, type: "sneaker" },
  { name: "Air Mahomeses", price: 501, type: "sneaker" },
  { name: "Utility Boots", price: 20, type: "boot" },
  { name: "Velcro Sandals", price: 15, type: "sandal" },
  { name: "Jet Boots", price: 1000, type: "boot" },
  { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];


let thereBeShoes = shoes;

app.get('/shoes', (req, res) => {
  const minPrice = parseInt(req.query['min-price'], 10);
  const maxPrice = parseInt(req.query['max-price'], 10);
  const type = req.query.type;

  if (!isNaN(minPrice)){
    thereBeShoes = thereBeShoes.filter((shoe) => shoe.price >= minPrice);
  } else if (!isNaN(maxPrice)){
    thereBeShoes = thereBeShoes.filter((shoe) => shoe.price <= maxPrice); 
  } else if (type){
    thereBeShoes = thereBeShoes.filter((shoe) => shoe.type === type);
  } else if (thereBeShoes.length > 0) {
    const newShoes = thereBeShoes.map(shoe => `<li>${shoe.name}: Price:${shoe.price}   The Type:${shoe.type}</li>`)
    res.send(`<ul>${newShoes}</ul>`);
  } else {
    res.send('We do not carry your shoes here at the moment!');
  }
})




