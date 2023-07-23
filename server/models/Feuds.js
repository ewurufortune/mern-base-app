import mongoose from "mongoose";

const FeudSchema = new mongoose.Schema(
  {
    id: { type: Number, },
    name: { type: String, default:'Higgins'},
    opponent: { type: Array, default: [] },
    ally: { type: Array, default: [] },
    requirements: {
      alignment: { type: String,default: 'face' },
      charisma: { type: String,default: 'menacing' },
    },
    length: { type: Number, default: 2 },
    tags: { type: Array, default: [] },
    multiplier: { type: Number, default: 1.2 },
    isCurrentFeud: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Feud = mongoose.model("Feud", FeudSchema);
export default Feud;
