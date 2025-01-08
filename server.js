const mongoose = require('mongoose')
const express = require('express')
const app = express()
const port = process.env.APP_PORT || 3000

const task = require('./routes/task');

app.use('/task', task)

app.get('/', (req, res) => {
    res.send('Hello World!')
})

if (!process.env.DB_USERNAME || !process.env.DB_PASSWORD) {
    console.error("Missing required environment variables: DB_USERNAME or DB_PASSWORD");
    process.exit(1);
}

mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@giyacluster.0ppso1o.mongodb.net/?retryWrites=true&w=majority&appName=GiyaCluster`)
.then(()=>{
    
    app.listen(port, () => {
        console.log(`Practice app listening on port ${port}`)
    })
    
})
.catch((error) => {
    console.log(error);
})