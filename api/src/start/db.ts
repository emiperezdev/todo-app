import mongoose from 'mongoose';

const db =  'mongodb://localhost/todo-app';

const initializeDB = () => {
  mongoose.connect(db)
    .then(() => console.log(`>>> Connected to ${db}...`))
    .catch(err => console.log(`<<<< Could not connect to ${db}...`))
}

export default initializeDB;