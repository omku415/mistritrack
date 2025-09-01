import mongoose from "mongoose";

const labourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Labour name is required"],
  },
  aadhaar: {
    type: String,
    required: [true, "Aadhaar number is required"],
    unique: true,
  },
  address: {
    type: String, 
  },
  site: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Site",
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export const Labour = mongoose.model("Labour", labourSchema);
