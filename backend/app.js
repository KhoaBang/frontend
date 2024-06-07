const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const routes = require('./api/apiRoutes')
const dotenv = require('dotenv')
dotenv.config()

const app = express()
const port = process.env.PORT || 8000

app.use(express.json());
app.use("/images", express.static('images'));
app.use(cookieParser())

mongoose.connect('mongodb://mongodb:27017/bookstore', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Database connected!'))
  .catch(error => console.error('Database connection error:', error))

routes(app);

app.get('/', (req, res) => {
  res.send('Welcome to the bookstore backend!');
});

app.listen(port, () => {
  console.log('Server is running on port', port)
});
