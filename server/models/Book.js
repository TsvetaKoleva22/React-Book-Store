const mongoose = require('mongoose');

const REQUIRED_VALIDATION_MESSAGE = '{PATH} is required';

let bookSchema = new mongoose.Schema({
  title: {type: mongoose.Schema.Types.String, required: REQUIRED_VALIDATION_MESSAGE, unique: [true, 'Book already exists.']},
  genres: [{type: mongoose.Schema.Types.String}],
  author: {type: mongoose.Schema.Types.String, required: REQUIRED_VALIDATION_MESSAGE},
  description: {type: mongoose.Schema.Types.String},
  price: {type: mongoose.Schema.Types.Number, required: REQUIRED_VALIDATION_MESSAGE},
  imageUrl: {type: mongoose.Schema.Types.String, required: REQUIRED_VALIDATION_MESSAGE},
  buyer: {type: mongoose.Schema.Types.String}
});

let Book = mongoose.model('Book', bookSchema);

module.exports = Book;