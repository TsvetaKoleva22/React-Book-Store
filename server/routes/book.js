const express = require('express')
const authCheck = require('../config/auth-check')
const Book = require('../models/Book')

const router = new express.Router()

function validateBookCreateForm(payload) {
  const errors = {}
  let isFormValid = true
  let message = ''

  payload.price = parseFloat(payload.price)

  if (!payload || typeof payload.title !== 'string' || payload.title.length < 3) {
    isFormValid = false
    errors.name = 'Book name must be at least 3 symbols.'
  }

  if (!payload || typeof payload.description !== 'string' || payload.description.length < 10 || payload.description.length > 100) {
    isFormValid = false
    errors.description = 'Description must be at least 10 symbols and less than 100 symbols.'
  }

  if (!payload || !payload.price || payload.price < 0) {
    isFormValid = false
    errors.price = 'Price must be a positive number.'
  }

  if (!payload || typeof payload.imageUrl !== 'string' || !payload.imageUrl.startsWith('https://') || payload.imageUrl.length < 14) {
    isFormValid = false
    errors.imageUrl = 'Please enter valid Image URL. Image URL must be at least 14 symbols.'
  }

  if (!isFormValid) {
    message = 'Check the form for errors.'
  }

  return {
    success: isFormValid,
    message,
    errors
  }
}

router.get('/all', (req, res) => {
  Book
    .find()
    .then(books => {
      res.status(200).json(books)
    })
})

router.post('/create', authCheck, (req, res) => {
  const bookObj = req.body
  if (req.user.roles.indexOf('Admin') > -1) {
    const validationResult = validateBookCreateForm(bookObj)
    if (!validationResult.success) {
      return res.status(200).json({
        success: false,
        message: validationResult.message,
        errors: validationResult.errors
      })
    }

    Book
      .create(bookObj)
      .then((createdBook) => {
        res.status(200).json({
          success: true,
          message: 'Book added successfully.',
          data: createdBook
        })
      })
      .catch((err) => {
        console.log(err)
        let message = 'Something went wrong :( Check the form for errors.'
        if (err.code === 11000) {
          message = 'Book with the given name already exists.'
        }
        return res.status(200).json({
          success: false,
          message: message
        })
      })
  } else {
    return res.status(200).json({
      success: false,
      message: 'Invalid credentials!'
    })
  }
})

router.post('/edit/:id', authCheck, (req, res) => {
  if (req.user.roles.indexOf('Admin') > -1) {
    const bookId = req.params.id
    const bookObj = req.body
    const validationResult = validateBookCreateForm(bookObj)
    if (!validationResult.success) {
      return res.status(200).json({
        success: false,
        message: validationResult.message,
        errors: validationResult.errors
      })
    }

    Book
      .findById(bookId)
      .then(existingBook => {
        existingBook.title = bookObj.title
        existingBook.author = bookObj.author
        existingBook.genres = bookObj.genres
        existingBook.description = bookObj.description
        existingBook.price = bookObj.price
        existingBook.imageUrl = bookObj.imageUrl

        existingBook
          .save()
          .then(editedBook => {
            res.status(200).json({
              success: true,
              message: 'Book edited successfully.',
              data: editedBook
            })
          })
          .catch((err) => {
            console.log(err)
            let message = 'Something went wrong :( Check the form for errors.'
            if (err.code === 11000) {
              message = 'Book with the given name already exists.'
            }
            return res.status(200).json({
              success: false,
              message: message
            })
          })
      })
      .catch((err) => {
        console.log(err)
        const message = 'Something went wrong :( Check the form for errors.'
        return res.status(200).json({
          success: false,
          message: message
        })
      })
  } else {
    return res.status(200).json({
      success: false,
      message: 'Invalid credentials!'
    })
  }
})

router.delete('/delete/:id', authCheck, (req, res) => {
  const id = req.params.id
  if (req.user.roles.indexOf('Admin') > -1) {
    Book
      .findById(id)
      .then((book) => {
        book
          .remove()
          .then(() => {
            return res.status(200).json({
              success: true,
              message: 'Book deleted successfully!'
            })
          })
      })
      .catch(() => {
        return res.status(200).json({
          success: false,
          message: 'Entry does not exist!'
        })
      })
  } else {
    return res.status(200).json({
      success: false,
      message: 'Invalid credentials!'
    })
  }
})

router.post('/buy/:id', authCheck, (req, res) => {
  const bookId = req.params.id
  const bookObj = req.body

  Book
    .findById(bookId)
    .then(currBook => {
      currBook.buyer = bookObj.buyer;

      currBook
        .save()
        .then(boughtBook => {
          res.status(200).json({
            success: true,
            message: 'Book bought successfully.',
            data: boughtBook
          })
        })
        .catch((err) => {
          console.log(err)
          let message = 'Something went wrong :('
          return res.status(200).json({
            success: false,
            message: message
          })
        })
    })
    .catch((err) => {
      console.log(err)
      const message = 'Something went wrong :('
      return res.status(200).json({
        success: false,
        message: message
      })
    })
})

module.exports = router;
