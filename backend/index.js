const express = require('express'); 
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const jsonwebtoken = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const app = express();

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