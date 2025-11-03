import { sequelize } from "./config/db.js";
import mongoose from 'mongoose';
import express from "express";
import { mongoUri } from "./config/mongo.js";
import userRoutes from "./routes/userRoutes.js";
import gameRoutes from "./routes/gameRoutes.js";
import roleRoutes from "./routes/roleRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import 'dotenv/config';


console.log('MongoDB URI:', mongoUri); // ← Ajoutez cette ligne


try {
await sequelize.sync({ alter: true });;
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
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/games", gameRoutes);
app.use("/api/roles",roleRoutes);
app.use("/api/auth", authRoutes);



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
