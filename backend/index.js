import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mogoose from 'mongoose';
// import { Book } from "./models/bookModel.js";
import booksRoute from "./routes/booksRoute.js";
import cors from 'cors';

const app = express();

//middleware for parsing request body
app.use(express.json());

//Middleware fro handling CORS POLICY
//option 1: Alllow all origins with Default of CORS(*)
app.use(cors())
// option 2: Allow cusotm origins
// app.use(cors({
//     origin:'http://localhost:5000',
//     method :['GET','PUT','POST','DELETE'],
//     allowedHeaders:['Content-Type']
// }))

app.get('/', (request, response) => {
    console.log(request)
    return response.status(234).send("Welcome to MERN Stack Tutorial")
})

app.use('/books', booksRoute);

mogoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('App connected to database')
        app.listen(PORT, () => {
            console.log(`App is listening to port : ${PORT}`)
        })
    })
    .catch((error) => {
        console.log(error)
    })

