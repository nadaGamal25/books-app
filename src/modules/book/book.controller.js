import { Book } from "../../../database/models/book.model.js"

const createBook=async (req,res)=>{
    let book =await Book.insertMany(req.body)
    res.status(201).json({msg:'success',book})
}

// const getBooks=async (req,res)=>{
//     let books=await Book.find()
//     res.status(200).json({msg:'success',books})
// }
const getBooks = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const skip = (page - 1) * limit;

        const totalBooks = await Book.countDocuments();

        const books = await Book.find().skip(skip).limit(limit);

        res.status(200).json({
            msg: 'success',
            totalBooks,
            currentPage: page,
            totalPages: Math.ceil(totalBooks / limit),
            books
        });
    } catch (error) {
        res.status(500).json({ msg: 'An error occurred', error });
    }
};


const getSingleBook=async (req,res)=>{
    let book=await Book.findById(req.params.id)
    res.status(200).json({msg:'success',book})
}

const updateBook = async (req, res) => {
    try {
        let book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!book) {
            return res.status(404).json({ msg: 'Book not found' });
        }

        res.status(200).json({ msg: 'success', book });
    } catch (error) {
        res.status(500).json({ msg: 'An error occurred', error });
    }
}

const deleteBook = async (req, res) => {
    try {
        let book=await Book.findByIdAndDelete(req.params.id)
        if (!book) {
            return res.status(404).json({ msg: 'Book not found' });
        }

        res.status(200).json({ msg: 'success' });
    } catch (error) {
        res.status(500).json({ msg: 'An error occurred', error });
    }
}

const searchBooks = async (req, res) => {
    try {
        const { title, author } = req.query;
        let filter = {};
        if (title) {
            filter.title = { $regex: title, $options: 'i' }; // case-insensitive regex search
        }
        if (author) {
            filter.author = { $regex: author, $options: 'i' };
        }

        const books = await Book.find(filter);

        res.status(200).json({
            msg: 'success',
            books
        });
    } catch (error) {
        res.status(500).json({ msg: 'An error occurred', error });
    }
}

export{
    createBook,getBooks,getSingleBook,updateBook,deleteBook,searchBooks
}