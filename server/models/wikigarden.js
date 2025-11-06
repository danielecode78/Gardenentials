const mongoose = require("mongoose");

const wikiGarden = new mongoose.Schema(
  {
    categories: {
      type: String,
      enum: [
        "Terreno",
        "Piante",
        "Tecniche",
        "Cure e trattamenti",
        "Tabelle e schemi",
        "Non specificata",
      ],
      default: "Non specificata",
    },
    title: { type: String, trim: true },
    description: { type: String, trim: true },
    content: { type: String, trim: true },
    model: { type: String, trim: true },
    images: [{ url: { type: String }, filename: { type: String } }],
  },
  {
    timestamps: true,
  }
);

const WikiGarden = mongoose.model("WikiGarden", wikiGarden);
module.exports = WikiGarden;
