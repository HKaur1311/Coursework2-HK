const  app = require('express');
const express = require('express');
 
const router = express.Router();

 
let products = [
    {
     'Topic': 'math', 
     'Location' : 'Hendon' , 
     'Price': "100"
    },


    {
    'Topic': 'math',
     'Location' : 'Colindale' , 
     'Price': "80"
    },


    {
     'Topic': 'math',
     'Location' : 'Brent Cross' , 
     'Price': "90"
    },


    {
      'Topic': 'math', 
      'Location' : 'Golder Green' , 
      'Price': "120"
    }
]
 

router.get('/lessons', (req,res)=> 
    res.json(products)
);


module.exports = router;