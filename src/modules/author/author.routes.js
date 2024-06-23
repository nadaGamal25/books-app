import express from 'express'
import { createAuthor, deleteAuthor, getAuthors, getSingleAuthor, searchAuthor, updateAuthor } from './author.controller.js'

const authorRouter= express.Router()

authorRouter.post('/create',createAuthor)
authorRouter.get('/getAll',getAuthors)
authorRouter.get('/getSingle/:id',getSingleAuthor)
authorRouter.patch('/update/:id',updateAuthor)
authorRouter.delete('/delete/:id',deleteAuthor)
authorRouter.get('/search', searchAuthor);

export default authorRouter