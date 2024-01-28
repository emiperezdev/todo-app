import mongoose from 'mongoose';
import config from 'config';

const db: string = config.get('db');

const initializeDB = () => {
  mongoose.connect(db)
    .then(() => console.log(`>>> Connected to ${db}...`))
    .catch(err => console.log(`<<<< Could not connect to ${db}...`))
}

export default initializeDB;