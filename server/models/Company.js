import mongoose from "mongoose";

const { Schema } = mongoose;

const CompanySchema = new Schema({
  name: {
    type: String,
  },
  preferredCharisma: {
    type: String,
  },
  inRingBenchmark: {
    type: Number,
  },
  popularityBenchmark: {
    type: Number,
  },
  bookerOpinion: {
    type: Number,
  },
});

const Company = mongoose.model("Company", CompanySchema);

export default Company;
