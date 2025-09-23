import { sequelize } from "./config/db.js";
import mongoose from 'mongoose';
import express from "express";
import { mongoUri } from "./config/mongo.js";
import 'dotenv/config';


console.log('MongoDB URI:', mongoUri); // ← Ajoutez cette ligne


try {
  await sequelize.authenticate();
  console.log('Connection to postgreDB has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

try {
  await mongoose.connect(mongoUri);
  console.log('Connection to MongoDB has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

const app = express();

app.get('/', (req, res) => {
  res.send('test test');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
