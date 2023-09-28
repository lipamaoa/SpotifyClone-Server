require('dotenv').config();
require('./db');
const express = require('express');
const cors = require('cors');
require ("express-async-errors")

const userRoutes = require('./Routes/users.route');
const authRoutes = require('./Routes/auth.route');
const songRoutes = require('./Routes/song.route');


const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/users", userRoutes);
app.use("/api/login", authRoutes);
app.use("/api/songs", songRoutes);

module.exports = app;