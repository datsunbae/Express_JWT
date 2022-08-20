const express = require('express'); 
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const jsonwebtoken = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

dotenv.config();
const app = express();

mongoose.connect(process.env.MONGOOSE_URL, () => {
    console.log('Connect to Mongoose Database');
})

app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
    res.json({
        status: 'Success',
    })
})

app.listen(3000, () => {
    console.log('Server is runing...')
})