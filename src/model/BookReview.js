import mongoose from "mongoose";

const bookReviewSchema = new mongoose.Schema({
    bookTitle: {type: String, required: true},
    author: {type: String, required: true},
    publicationYear: {type: Number, },
    publisher: {type: String},
    username: {type: String, required: true},
    date: {type: Date, required: true, default: Date.now},
    text: {type: String, required: true},
    views: {type: Number, default: 0},

});

const BookReview = mongoose.model("BookReview", bookReviewSchema);

export default BookReview;