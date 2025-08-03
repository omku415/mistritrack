import mongoose from "mongoose";

const siteSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  supervisor_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false, // changed from true to false
  },
  status: {
    type: String,
    enum: ["active", "paused", "completed"],
    default: "active",
  },
  start_date: {
    type: Date,
    default: Date.now,
  },
  description: {
    type: String,
  },
  image: {
    type: String, // store image URL or file path
    required: false,
  },
});

// ✅ Export Site model using siteSchema
export const Site = mongoose.model("Site", siteSchema);
