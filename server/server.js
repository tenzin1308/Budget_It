const cors = require('cors')
const dotenv = require("dotenv")
const express = require("express")
const mongoose = require('mongoose')

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Port
const port = 8080

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

app.get('/', (req, res) => {
  res.send('Server is ready');
});


/////////////////////////////////////////////////////////////////

if (process.env.NODE_ENV === "production") {
    const __dirname = path.resolve();
    app.use(express.static(path.join(__dirname, "./client/build")));
    app.get("/*", function (request, response) {
        response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
    })
}


app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
})