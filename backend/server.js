
const app = require('./app')
const connectDatabase = require('./config/database')


const dotenv = require('dotenv');

//Handle Uncaught exceptions 
process.on('uncaughtException', err => {
  console.log(`ERROR: ${err.stack}`);
    console.log('Shutting down the server due to unhandled promise exceptions');
      process.exit(1)
    })




//setting up confiq file
dotenv.config({ path: 'backend/config/config.env' })






// connecting to database
connectDatabase();



const server = app.listen(process.env.PORT, () => {
    console.log(`Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode. ` );
  });

  //Handle unhandled Promise Rejections
  process.on('unhandlesRejection', err => {
    console.log(`ERROR: ${err.message}`);
    console.log('shutting down the server due to unhandled promise rejection');
    server.close(() =>{
      process.exit(1)
    })
  })