const mongoose = require("mongoose");

const gardenSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      address: { type: String, required: true, trim: true },
      lat: { type: Number, required: true },
      lon: { type: Number, required: true },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    lastWatered: { type: Date },
    soilType: {
      type: String,
      enum: [
        "Argilloso",
        "Sabbioso",
        "Limoso",
        "Torba",
        "Calcareo",
        "Humifero",
        "Roccioso",
        "Equilibrato",
      ],
      default: "Equilibrato",
    },
    myPlants: [
      {
        plant: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Plant",
        },
        name: {
          type: String,
          trim: true,
        },
        healthStatus: {
          type: String,
          enum: ["Sana", "Stressata", "Malata"],
          default: "Sana",
        },
        diary: [
          {
            image: {
              url: { type: String },
              filename: { type: String },
            },
            title: { type: String },
            date: { type: Date },
            content: { type: String },
          },
        ],
        lightExposure: {
          type: String,
          enum: ["Pieno sole", "Mezz'ombra", "Ombra"],
        },
        soilPh: {
          date: { type: Date },
          value: {
            type: String,
            enum: [
              "< 5.5",
              "5.5 - 6.5",
              "6.5 - 7.5",
              "7.5 - 8.0",
              "> 8.0",
              "Nessuna misurazione",
            ],
            default: "Nessuna misurazione",
          },
        },
        history: {
          plantedAt: { type: Date },
          lastFertilized: {
            dateFertilizing: { type: Date },
            noteFertilizing: { type: String },
          },
          lastPruned: {
            datePruning: { type: Date },
            notePruning: { type: String },
          },
          treatments: [
            {
              dateTreatment: { type: Date },
              noteTreatment: { type: String },
            },
          ],
        },
        nextActions: {
          nextFertilization: {
            dateFertilizing: { type: Date },
            noteFertilizing: { type: String },
          },
          nextPruning: {
            datePruning: { type: Date },
            notePruning: { type: String },
          },
          nextTreatment: {
            dateTreatment: { type: Date },
            noteTreatment: { type: String },
          },
        },
        images: [],
        notes: { type: String, trim: true },
      },
    ],
    images: [
      {
        url: { type: String },
        filename: { type: String },
      },
    ],
    weather: {
      dataApi: {
        type: mongoose.Schema.Types.Mixed,
        default: {},
      },
      updatedAt: { type: Date, default: Date.now },
    },
    notes: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Garden = mongoose.model("Garden", gardenSchema);
module.exports = Garden;
