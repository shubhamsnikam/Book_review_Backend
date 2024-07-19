const express = require ('express');
const bookController = require('../controller/bookcontroller')
const authorise = require('../middleware/authorise')

const bookrouter = express.Router();

bookrouter.post('/addbook',bookController.addbook);

bookrouter.get('/getbook',bookController.getbook);

bookrouter.put('/updatebook/:id',bookController.updatebook);

bookrouter.delete('/deletebook/:id',bookController.deletebook);

bookrouter.post('/:id',authorise,bookController.addreviews);

bookrouter.get('/:id',bookController.getReview);

module.exports = bookrouter;