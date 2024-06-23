import express from 'express'
import { createBook, deleteBook, getBooks, getSingleBook, searchBooks, updateBook } from './book.controller.js'

const bookRouter= express.Router()

bookRouter.post('/create',createBook)
bookRouter.get('/getAll',getBooks)
bookRouter.get('/getSingle/:id',getSingleBook)
bookRouter.patch('/update/:id',updateBook)
bookRouter.delete('/delete/:id',deleteBook)
bookRouter.get('/search', searchBooks)

export default bookRouter