import mongoose from "mongoose";
import { v4 } from "uuid";

// Schéma des DLC
const dlcSchema = new mongoose.Schema({
  dlc_name: {
    type: String,
    required: true,
  },
  dlc_completion: {
    type: String,
    required: true,
  },
}, { _id: false });

// Schéma principal
const gameConfigSchema = new mongoose.Schema({
  idConfig: {
    type: String, 
    default: v4, 
    unique: true,
    index: true,
  },
  screen_resolution: {
    height: {
      type: Number,
      required: true,
      default: 1080
    },
    width: {
      type: Number,
      required: true,
      default: 1920
    },
  },
  completion: {
    type: String,
    required: true,
    default: "0%"
  },
  dlc_aquired: {
    type: [dlcSchema],
    default: [],
  },
  luminosity: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
    default:50
  },
  daltonian_mode: {
    type: Boolean,
    default: false,
    allownull: true
  },
}, { _id: false, versionKey: false });

const GameConfigModel = mongoose.model("GameConfig", gameConfigSchema);

export default GameConfigModel;
