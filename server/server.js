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
        maxPoolSize:50,
        wtimeoutMS:2500,
        useNewUrlParser:true,
        useUnifiedTopology: true
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