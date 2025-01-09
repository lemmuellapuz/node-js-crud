const mongoose = require('mongoose')
const express = require('express')
const app = express()
const port = process.env.APP_PORT || 3000
const { DATABASE } = require('./src/config/database.config');

const route = require('./src/routes/router');

app.use('/api/v1', route)

if (!DATABASE.username || !DATABASE.password) {
    console.error("Missing required environment variables: DB_USERNAME or DB_PASSWORD");
    process.exit(1);
}

mongoose.connect(`mongodb+srv://${DATABASE.username}:${DATABASE.password}@giyacluster.0ppso1o.mongodb.net/${DATABASE.name}?retryWrites=true&w=majority&appName=GiyaCluster`)
.then(()=>{
    app.listen(port, () => {
        console.log(`Practice app listening on port ${port}`)
    })
})
.catch((error) => {
    throw new Error(error);
})