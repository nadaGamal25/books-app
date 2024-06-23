import { Author } from "../../../database/models/author.model.js"

const createAuthor=async (req,res)=>{
    let author =await Author.insertMany(req.body)
    res.status(201).json({msg:'success',author})
}

// const getAuthors=async (req,res)=>{
//     let authors=await Author.find()
//     res.status(200).json({msg:'success',authors})
// }
const getAuthors = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const skip = (page - 1) * limit;

        const totalAuthors = await Author.countDocuments();

        const authors = await Author.find().skip(skip).limit(limit);

        res.status(200).json({
            msg: 'success',
            totalAuthors,
            currentPage: page,
            totalPages: Math.ceil(totalAuthors / limit),
            authors
        });
    } catch (error) {
        res.status(500).json({ msg: 'An error occurred', error });
    }
};

const getSingleAuthor=async (req,res)=>{
    let author=await Author.findById(req.params.id).populate('books')
    res.status(200).json({msg:'success',author})
}

const updateAuthor = async (req, res) => {
    try {
        let author = await Author.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!author) {
            return res.status(404).json({ msg: 'Author not found' });
        }

        res.status(200).json({ msg: 'success', author });
    } catch (error) {
        res.status(500).json({ msg: 'An error occurred', error });
    }
}

const deleteAuthor = async (req, res) => {
    try {
        let author=await Author.findByIdAndDelete(req.params.id)
        if (!author) {
            return res.status(404).json({ msg: 'Author not found' });
        }

        res.status(200).json({ msg: 'success' });
    } catch (error) {
        res.status(500).json({ msg: 'An error occurred', error });
    }
}

const searchAuthor = async (req, res) => {
    try {
        const { name, bio } = req.query;
        let filter = {};
        if (name) {
            filter.name = { $regex: name, $options: 'i' }; // case-insensitive regex search
        }
        if (bio) {
            filter.bio = { $regex: bio, $options: 'i' };
        }

        const authors = await Author.find(filter);

        res.status(200).json({
            msg: 'success',
            authors
        });
    } catch (error) {
        res.status(500).json({ msg: 'An error occurred', error });
    }
}

export{
    createAuthor,getAuthors,getSingleAuthor,updateAuthor,deleteAuthor,searchAuthor
}