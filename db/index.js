const mongoose = require('mongoose');

const MongoDB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/SpotifyClone";

mongoose
.connect(MongoDB_URI)
.then((x) => {
    const dbName = x.connections[0].name;
    console.log(`Connected to MongoDB! Database name: "${dbName}".`);
})
.catch((err) => {
    console.log("Error connecting to MongoDB",err);
});