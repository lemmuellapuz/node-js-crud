const mongoose = require('mongoose')
const express = require('express')
const app = express()
const port = process.env.APP_PORT || 3000
const { DATABASE } = require('./src/config/database.config');

const route = require('./src/routes/router');

const helmet = require('helmet');
const limiter = require('./src/middlewares/RateLimiter.middleware'); 
const errorHandler = require('./src/middlewares/ErrorHandler.middleware');
const sanitizeRequest = require('./src/middlewares/SanitizeRequest.middleware');

//MIDDLEWARES
app.use(express.json())
app.use(helmet());
app.use(limiter);
app.use(sanitizeRequest);

//ROUTES
app.use('/api/v1', route)

app.use(errorHandler);

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