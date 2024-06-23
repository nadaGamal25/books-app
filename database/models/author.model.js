import { Schema, model } from "mongoose"

const schema =new Schema({
    name: { type: String, required: true },
    bio: { type: String },
    birthDate: { type: Date },
    books: [{ type: Schema.Types.ObjectId, ref: 'Book' }]  

})

export const Author=model('Author',schema)