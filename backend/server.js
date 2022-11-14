const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const connectBD = require('./config/db');
const path = require('path')

const port = process.env.port || 5000;

connectBD();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/goals', require('./routes/goalsRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

//server frontend
if(process.env.NODE_ENV === 'production'){
  //set static forder//build forder for fronted
  app.use(express.static(path.join(__dirname, '../frontend/build')))

  app.get('*', (rq,res) => res.sendFile(path.resolve(__dirname, '../', 'frontend','build', 'index.html')))
}

app.use(errorHandler);

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
