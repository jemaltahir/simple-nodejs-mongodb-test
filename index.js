const http = require('http');
const MongoClient = require('mongodb').MongoClient;

// MongoDB connection settings
const user = process.env.MONGODB_USER;
const password = encodeURIComponent(process.env.MONGODB_PASSWORD);
const database = process.env.MONGODB_DATABASE;
const mongoServiceName = 'mongodb';
const mongoPort = '27017';
const url = `mongodb://${user}:${password}@${mongoServiceName}:${mongoPort}/${database}`;

// Start HTTP server
const server = http.createServer((req, res) => {
    if (req.url === '/health') {
        // Liveness and readiness probe endpoint
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('OK');
    } else if (req.url === '/testdb') {
        // Database connection test endpoint
        MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
            if (err) {
                console.error('Failed to connect to MongoDB:', err);
                res.statusCode = 500;
                res.setHeader('Content-Type', 'text/plain');
                res.end('Failed to connect to MongoDB');
                return;
            }
            console.log("Connected successfully to MongoDB");
            client.close(); 

            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            res.end('Successfully connected to MongoDB');
        });
    } else {
        // Handle not found
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Not Found');
    }
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
