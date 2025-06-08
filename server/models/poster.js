import mongoose from 'mongoose';

const posterSchema = new mongoose.Schema({
    posterId: {
        type: String,
        required: true,
        unique: true
    },
    question: String,
    options: [String],
    correctAnswer: String,
    nextClue: String,
    
})

const Poster = mongoose.model('Poster', posterSchema);
export default Poster;