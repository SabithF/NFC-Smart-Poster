import mongoose from "mongoose";
import dotenv from "dotenv";
import Poster from "../models/poster.js";
import User from "../models/user.js";

dotenv.config();
const posters = [
  {
    posterId: "p1",
    question: "Test question 1",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    correctAnswer: "Paris",
    nextClue: "Test clue 2",
  },
  {
    posterId: "p2",
    question: "Test question 2",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    correctAnswer: "Jupiter",
    nextClue: "Test clue 3",
  },
];

mongoose.connect(process.env.URI)
   .then(async ()=> {
    await Poster.deleteMany({});
    await Poster.insertMany(posters);
    console.log("Posters seeded successfully");
    process.exit();
   }) 
    .catch((error) => {
     console.error("Error seeding posters:", error);
     process.exit(1);
    });