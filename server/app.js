const dotenv = require('dotenv');
const mongoose = require('mongoose');
const express = require('express');
const app = express();

dotenv.config({path:'./config.env'})
require('./db/conn');

app.use(express.json());

// we link the router file
app.use(require('./router/auth'));

// const User = require('./model/userSchema');

const PORT = process.env.PORT;


app.get('/', (req, res) => {
    res.send("hello vitthal-----");
});

app.get('/about', (req, res) => {
    res.send("hello vitthal about");
});

app.get('/contact', (req, res) => {
    res.send("hello vitthal contact");
});

app.get('/signin', (req, res) => {
    res.send("hello vitthal signin");
});

app.get('/signup', (req, res) => {
    res.send("hello vitthal signup");
});

app.listen(PORT, ()=>{
    console.log(`server is running at port no ${PORT}`);
})

