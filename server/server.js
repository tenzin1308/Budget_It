import cors from 'cors'
import dotenv from "dotenv"
import express from "express"
import mongoose from 'mongoose'
import budgetItRouter from './routers/budgetItRouter.js'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// MongoDB connection
mongoose.connect(
    process.env.BudgetIt_DB_URL || 'mongodb://localhost/budgetIt',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000,
        autoIndex: false, // Don't build indexes
        maxPoolSize: 10, // Maintain up to 10 socket connections
        serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
        socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
        family: 4 // Use IPv4, skip trying IPv6
    }
)

/////////////////////////////////////////////////////////////////

app.use('/api', budgetItRouter);

// app.get('/', (req, res) => {
//   res.send('Server is ready');
// });


/////////////////////////////////////////////////////////////////

// Port
const port = process.env.PORT || 8000;

// if (process.env.NODE_ENV === "production") {
//     const __dirname = path.resolve();
//     app.use(express.static(path.join(__dirname, "./client/build")));
//     app.get("/*", function (request, response) {
//         response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
//     })
// }


app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
})