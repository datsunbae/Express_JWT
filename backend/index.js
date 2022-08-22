const express = require('express'); 
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const jsonwebtoken = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const route = require('./routes');

dotenv.config();
const app = express();

// Connect to mongoDB
mongoose.connect(process.env.MONGOOSE_URL, () => {
    console.log('Connecting to mongoose');
});

app.use(express.json());
app.use(cookieParser());

//Routes
route(app);

app.listen(3000, () => {
    console.log('Server is runing...')
})