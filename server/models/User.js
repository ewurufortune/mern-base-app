import mongoose from "mongoose";
import Feud from "./Feuds.js";
import Company from "./Company.js";
import {
  mainLogs,
  participants,
  factions,
  categories,
  items,
  stats,
  randomEvents,
  relationships,
  date,
  arcs,
  statPerception,
}  from "../data/arrays.js";
const { Schema } = mongoose;
const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    lastName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    picturePath: {
      type: String,
      default: "",
    },
    mainLogs: {
      type: Array,
      default:mainLogs,
    },
    participants: {
      type: Array,
      default:participants,
    },
    factions: {
      type: Array,
      default:factions,
    },
    categories: {
      type: Array,
      default:categories,
    },
    items: {
      type: Array,
      default:items,
    },

    stats: {
      type: Array,
      default:stats,
    },
    relationships: {
      type: Array,
      default:relationships,
    },
    statPerception: {
      type: Array,
      default:statPerception,
    },
    arcs: {
      type: Array,
      default:arcs,
    },
    date: {
      type: Date,
      default:date,
    },
    randomEvents: {
      type: Array,
      default:randomEvents,
    },
    location: String,

    viewedProfile: Number,
    impressions: Number,
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
