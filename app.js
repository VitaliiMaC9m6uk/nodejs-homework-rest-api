let express = require("express");
let dotenv = require("dotenv");

let connectDB = require("./db");
const { urlencoded } = require("express");
require("colors");

const contactsRouter = require("./routes/api/contacts");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Load env variables
dotenv.config();

app.use("/api/contacts", contactsRouter);

// Connect DB
connectDB();

// Provide server
const { PORT, NODE_ENV } = process.env || 5050;

console.log(PORT);
app.listen(PORT, () => {
    console.log(`Server running in ${NODE_ENV} mode on port ${PORT}`.cyan.bold);
});
