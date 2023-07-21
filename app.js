
require('dotenv').config();
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const route = require('./routes')

//extra security packages
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');

// error handler
const notFoundMiddleware = require('./middleware/not-found');

app.use(express.json());
app.use(xss());
app.use(helmet());
app.use(cors());


route(app)

app.use(notFoundMiddleware);

const port = process.env.PORT || 5000;
const start = async () => {
    app.listen(port, (req, res) => {
        console.log(`Listening on port ${port}`);
    });
}

start();