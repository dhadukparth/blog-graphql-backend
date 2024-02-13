const mongoose = require('mongoose')
const db_url = process.env.MONGODB_URI

mongoose
    .connect(db_url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Database Connected Successfully");
    })
    .catch((err) => {
        console.log("Sorry!, Database has been not connected", err);
    })