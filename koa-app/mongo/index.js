import mongoose from 'mongoose';
import config from '../config';

const options = {
  user: 'root',
  pass: 'root'
};

const connectWithRetry = () => {
  console.log('MongoDB connection with retry');
  mongoose.connect(config.mongoHost, options)
    .then(() => {
      console.log('MongoDB is connected')
    })
    .catch(err => {
      console.log('MongoDB connection unsuccessful, retry after 5 seconds.', err);
      setTimeout(connectWithRetry, 5000)
    })
};
setTimeout(connectWithRetry, 500);

