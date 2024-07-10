
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
const mongoose = require('./dbConection/databaseConnection');
const fileUpload = require('express-fileupload');


app.use(cookieParser());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use(bodyParser.json());
var corsOptions = {
    origin: ['http://localhost:4200','https://susa-crmpublic-render-deploy-3.onrender.com'], // Specify your trusted domain
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));
app.use(fileUpload({
    createParentPath: true,
    limits: { fileSize: 50 * 1024 * 1024 }, // Limit to 50MB
}));


// Routes
app.get('/', (req, res) => {
    console.log("Homepage access attempt");
    res.json('Server is working!');
});
app.use('/Api/Document', require('./Api/Document'));

app.use('/Api/SuperAdmin', require('./Api/SuperAdmin'));




app.use((err, req, res, next) => {
    console.error("Error Stack:", err.stack);
    console.error("Error Status:", err.statusCode);
    console.error("Error Message:", err.message);
    res.status(err.statusCode || 500).json({
        error: err.message || 'An error occurred'
    });
});


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is up and running on port ${port}`);
});
