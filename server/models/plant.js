const mongoose = require("mongoose");

const plantSchema = new mongoose.Schema(
  {
    commonName: { type: String, trim: true },
    scientificName: { type: String, required: true, trim: true },
    commonNameVariety: { type: String, trim: true },
    scientificVariety: { type: String, trim: true },
    plantDescription: { type: String, trim: true },
    sunExposure: { type: String, trim: true },
    recommendedSoil: { type: String, trim: true },
    annualGrowthRate: { type: String, trim: true },
    maximumSize: { type: String, trim: true },
    pruningMonths: { type: String, trim: true },
    recommendedPruningType: { type: String, trim: true },
    recommendedFertilizerType: { type: String, trim: true },
    irrigationType: { type: String, trim: true },
    floweringPeriod: { type: String, trim: true },
    usage: { type: String, trim: true },
    toxicity: { type: String, trim: true },
    containmentNeeds: { type: String, trim: true },
    seasonalRequirements: { type: String, trim: true },
    images: [],
  },
  {
    timestamps: true,
  }
);

const Plant = mongoose.model("Plant", plantSchema);
module.exports = Plant;
