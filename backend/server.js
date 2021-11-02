const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

//import routes
const policy = require('./src/route');

// import DB
const connectDatabase = require('./src/config/db')

dotenv.config({path:'src/config/config.env'})

connectDatabase()

const app = express();

app.use(express.json());
app.use(cors())

app.use('/api', policy)

app.listen(process.env.PORT, ()=>{
    console.log(`Server running on port ${process.env.PORT}`);
})

module.exports = app;