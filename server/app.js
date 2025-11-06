if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
console.log(
  `AMBIENTE: ${
    process.env.NODE_ENV === "production" ? "PRODUZIONE" : "SVILUPPO"
  }`
);

const express = require("express");
const app = express();
app.use(express.json());
const axios = require("axios");

const mongoose = require("mongoose");
const User = require("./models/user");
const Garden = require("./models/garden");
const Plant = require("./models/plant");
const WikiGarden = require("./models/wikigarden");
mongoose.connect(process.env.MONGO_URI);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Errore di connessione:"));
db.once("open", () => {
  console.log("Database connesso");
});

const cors = require("cors");
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

const session = require("express-session");
const connectMongo = require("connect-mongo");
const timeSession = 1000 * 60 * 60 * 24 * 7;
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: connectMongo.create({
      mongoUrl: process.env.MONGO_URI,
      ttl: timeSession,
    }),
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
      maxAge: timeSession,
    },
  })
);

const passport = require("passport");
const LocalStrategy = require("passport-local");
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const { CloudinaryStorage } = require("multer-storage-cloudinary");
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "Gardenentials",
    allowedFormats: ["jpeg", "png", "jpg"],
    transformation: [
      { height: 1200, crop: "scale" },
      { quality: "auto" },
      { fetch_format: "auto" },
    ],
  },
});

const multer = require("multer");
const upload = multer({ storage });
// -------------------- Middlewares
const catchAsync = (func) => {
  return (req, res, next) => {
    func(req, res, next).catch(next);
  };
};

const isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    res.status(401).json({
      success: false,
      statusCode: 401,
      message: "Devo essere loggato!",
      stack: process.env.NODE_ENV !== "production" ? err.stack : undefined,
    });
  }
  next();
};

// -------------------- Rotte Login/Logout/Register
app.get("/loggedIn", (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ user: req.user });
  } else {
    res.sendStatus(200);
  }
});

app.post(
  "/login",
  passport.authenticate("local"),
  catchAsync(async (req, res) => {
    res.json({ user: req.user });
  })
);

app.post("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Errore durante il logout",
      });
    }

    res.sendStatus(200);
  });
});

app.post(
  "/register",
  catchAsync(async (req, res) => {
    const { password, ...data } = req.body;
    const newUser = new User(data);
    await User.register(newUser, password);
    req.login(newUser, (err) => {
      if (err) return next(err);
      res.json({ user: newUser });
    });
    // res.sendStatus(200);
  })
);

// -------------------- Rotte get giardini
app.get(
  "/gardens",
  isLoggedIn,
  catchAsync(async (req, res) => {
    const gardens = await Garden.find({ owner: req.user._id });
    res.json({ gardens });
  })
);

app.get(
  "/get-garden/:id",
  isLoggedIn,
  catchAsync(async (req, res) => {
    const garden = await Garden.findById(req.params.id).populate(
      "myPlants.plant"
    );
    if (!garden.owner.equals(req.user.id)) {
      return res.status(403).json({ error: "Accesso negato" });
    } else {
      res.json({ garden });
    }
  })
);

// -------------------- Rotte post e modifica giardino
app.post(
  "/create-garden",
  isLoggedIn,
  upload.array("images"),
  catchAsync(async (req, res) => {
    const imgsArr = req.files.map((el) => ({
      url: el.path,
      filename: el.filename,
    }));
    const newGarden = new Garden(req.body);
    newGarden.owner = req.user._id;
    newGarden.images = [];
    newGarden.images.push(...imgsArr);
    await newGarden.save();
    res.sendStatus(200);
  })
);

app.patch(
  "/edit-garden/:gardenId",
  isLoggedIn,
  upload.array("images"),
  catchAsync(async (req, res) => {
    const garden = await Garden.findById(req.params.gardenId);
    if (!garden.owner.equals(req.user.id)) {
      return res.status(403).json({ error: "Accesso negato" });
    }
    garden.name = req.body.name;
    garden.soilType = req.body.soilType;
    garden.location = req.body.location;
    const imgsArr = req.files.map((el) => ({
      url: el.path,
      filename: el.filename,
    }));
    garden.images.push(...imgsArr);
    if (req.body.imagesToDelete && req.body.imagesToDelete.length > 0) {
      for (let filename of req.body.imagesToDelete) {
        await cloudinary.uploader.destroy(filename);
      }
      garden.images = garden.images.filter(
        (img) => !req.body.imagesToDelete.includes(img.filename)
      );
    }
    await garden.save();
    res.sendStatus(200);
  })
);

app.patch(
  "/edit-fields/:gardenId",
  isLoggedIn,
  catchAsync(async (req, res) => {
    const { field, value } = req.body.editObj;

    const garden = await Garden.findById(req.params.gardenId);
    if (!garden.owner.equals(req.user.id)) {
      return res.status(403).json({ error: "Accesso negato" });
    }
    garden[field] = value;

    await garden.save();
    res.sendStatus(200);
  })
);

app.delete(
  "/delete-garden/:gardenId",
  isLoggedIn,
  catchAsync(async (req, res) => {
    const garden = await Garden.findById(req.params.gardenId);
    if (!garden.owner.equals(req.user.id)) {
      return res.status(403).json({ error: "Accesso negato" });
    }
    await garden.deleteOne();
    res.sendStatus(200);
  })
);

// -------------------- Rotte gestione myPlants

app.get(
  "/plant/:gardenId/:plantId",
  isLoggedIn,
  catchAsync(async (req, res) => {
    const query = await Garden.findById(req.params.gardenId, {
      myPlants: { $elemMatch: { _id: req.params.plantId } },
    });
    if (!query.owner.equals(req.user.id)) {
      return res.status(403).json({ error: "Accesso negato" });
    }
    const plant = query.myPlants[0];
    res.json({ plant });
  })
);

app.post(
  "/add-myplants/:gardenId",
  isLoggedIn,
  catchAsync(async (req, res) => {
    const { field, value } = req.body.editObj;
    const garden = await Garden.findById(req.params.gardenId);
    if (!garden.owner.equals(req.user.id)) {
      return res.status(403).json({ error: "Accesso negato" });
    }
    garden[field].push(value);
    await garden.save();
    res.sendStatus(200);
  })
);

app.patch(
  "/edit-plant/:gardenId/:plantId",
  isLoggedIn,
  catchAsync(async (req, res) => {
    const { gardenId, plantId } = req.params;
    const { field, value } = req.body.editObj;

    const path = `${field}.$[filter]`;
    const garden = await Garden.findByIdAndUpdate(
      { _id: gardenId, owner: req.user.id },
      {
        $set: {
          [path]: value,
        },
      },
      {
        arrayFilters: [{ "filter._id": plantId }],
        new: true,
        runValidators: true,
      }
    );
    if (!garden) {
      return res
        .status(403)
        .json({ error: "Accesso negato o giardino non trovato" });
    }
    res.sendStatus(200);
  })
);

app.patch(
  "/massive-edit-plants/:gardenId",
  isLoggedIn,
  catchAsync(async (req, res) => {
    const { gardenId } = req.params;
    const { field, arrayId, content } = req.body.data;
    const path = `myPlants.$[filter].${field}`;
    const garden = await Garden.findByIdAndUpdate(
      { _id: gardenId, owner: req.user.id },
      {
        $set: {
          [path]: content,
        },
      },
      {
        arrayFilters: [{ "filter._id": { $in: arrayId } }],
        new: true,
        runValidators: true,
      }
    );
    if (!garden) {
      return res
        .status(403)
        .json({ error: "Accesso negato o giardino non trovato" });
    }
    res.sendStatus(200);
  })
);

app.delete(
  "/delete-plant/:gardenId",
  isLoggedIn,
  catchAsync(async (req, res) => {
    const { gardenId } = req.params;
    const elementsToDelete = req.body.selected;
    await Garden.findByIdAndUpdate(
      { _id: gardenId, owner: req.user.id },
      {
        $pull: { myPlants: { _id: { $in: elementsToDelete } } },
      },
      { new: true, runValidators: true }
    );
    if (!garden) {
      return res
        .status(403)
        .json({ error: "Accesso negato o giardino non trovato" });
    }
    res.sendStatus(200);
  })
);

// -------------------- API AI
// const FREE_MODELS = [
//   "meta-llama/llama-3.3-70b-instruct:free",
//   "deepseek/deepseek-r1-distill-llama-70b:free",
//   "nousresearch/hermes-3-llama-3.1-405b:free",
//   "deepseek/deepseek-r1-0528-qwen3-8b:free",
//   "deepseek/deepseek-chat-v3.1:free",
// ];

const FREE_MODELS = [
  "nousresearch/hermes-3-llama-3.1-405b:free",
  "meta-llama/llama-3.3-70b-instruct:free", //
  "deepseek/deepseek-chat-v3.1:free", //
  "deepseek/deepseek-r1-0528-qwen3-8b:free",
  "deepseek/deepseek-r1-distill-llama-70b:free",
];

function sanitizeJsonString(str) {
  return str
    .replace(/```json|```/g, "")
    .replace(/\\(?!["\\/bfnrtu])/g, "")
    .replace(/[\u0000-\u001F]+/g, " ")
    .replace(/\r?\n|\r/g, " ")
    .replace(/\t/g, " ")
    .trim();
}

async function generateStructuredPlantData({ name, variety }) {
  const prompt = `
Genera un oggetto JSON con questa struttura esatta per la pianta con nome "${name}" e varietà "${variety}". Il testo deve essere in lingua italiana. Usa solo i campi indicati, senza modificarli o aggiungerne altri. Il tasso di crescita esprimilo in centimetri annui. Per il campo fertilizzante specifica i fertilizzanti idonei. Per irrigazione specifica la quantità e ogni quanto tempo, esempio: abbondante ogni 7 giorni. Per la tossicità, se vi sono parti tossiche e non tossiche specificare quali. Rispondi solo con l'oggetto JSON, senza testo introduttivo.

{ "commonName": "",
  "scientificName": "",
  "commonNameVariety": "", 
  "scientificVariety": "",
  "plantDescription": "",
  "sunExposure": "",
  "recommendedSoil": "",
  "annualGrowthRate": "",
  "maximumSize": "",
  "pruningMonths": "",
  "recommendedPruningType": "",
  "recommendedFertilizerType": "",
  "irrigationType": "",
  "floweringPeriod": "",
  "usage": "",
  "toxicity": "",
  "containmentNeeds": "",
  "seasonalRequirements": ""
}
`;

  for (const model of FREE_MODELS) {
    try {
      const response = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          model,
          messages: [{ role: "user", content: prompt }],
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.OPENROUTER}`,
            "Content-Type": "application/json",
            timeout: 10000,
          },
        }
      );

      const raw = response.data.choices[0].message.content;
      const match = raw.match(/\{[\s\S]*?\}/);
      if (!match) {
        console.warn(`Modello ${model}: nessun oggetto JSON trovato.`);
        continue;
      }

      const clean = sanitizeJsonString(match[0]);
      try {
        const parsed = JSON.parse(clean);

        // Validazione semantica: tutti i campi richiesti devono esistere
        const requiredKeys = [
          "commonName",
          "scientificName",
          "commonNameVariety",
          "scientificVariety",
          "plantDescription",
          "sunExposure",
          "recommendedSoil",
          "annualGrowthRate",
          "maximumSize",
          "pruningMonths",
          "recommendedPruningType",
          "recommendedFertilizerType",
          "irrigationType",
          "floweringPeriod",
          "usage",
          "toxicity",
          "containmentNeeds",
          "seasonalRequirements",
        ];

        const missing = requiredKeys.filter((k) => !(k in parsed));
        if (missing.length > 0) {
          console.warn(
            `Modello ${model}: campi mancanti → ${missing.join(", ")}`
          );
          continue;
        }

        console.info(`Modello usato: ${model}`);
        return parsed;
      } catch (parseError) {
        console.error(
          `Modello ${model}: errore parsing JSON`,
          parseError.message
        );
        continue;
      }
    } catch (error) {
      const code = error.response?.status || error.code;
      const message = error.response?.data?.error?.message || error.message;
      console.warn(`Modello ${model}: errore ${code} - ${message}`);

      if (code === 429 || code === 503) {
        continue;
      } else {
        break;
      }
    }
  }

  console.error("Tutti i modelli hanno fallito.");
  return null;
}

async function generateGuideArticle({ title, description, category }) {
  const prompt = `
Scrivi una guida esaustiva e dettagliata in lingua italiana che possa essere usata come guida pratica sul giardinaggio.

Titolo dell’articolo: "${title}"
Descrizione dell'articolo: "${description}"
Categoria tematica: "${category}"

L’articolo deve:
- Essere scritto in italiano
- Essere coerente con il titolo, la descrizione e la categoria indicati
- Offrire consigli pratici, spiegazioni chiare e informazioni utili
- Evitare introduzioni generiche o contenuti fuori tema
- Non includere testo promozionale o riferimenti a marchi

Rispondi esclusivamente con un oggetto JSON nel seguente formato:

{ "content": "<p>QUI VA IL TESTO DELLA GUIDA IN HTML</p>" }

Il campo "content" deve contenere HTML valido e ben formattato, con tag semantici come <h2>, <ul>, <li>, <p>, <strong>, ecc. Non includere <html>, <head> o <body>. Non aggiungere testo fuori dall’oggetto JSON.
`;

  for (const model of FREE_MODELS) {
    try {
      const response = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          model,
          messages: [{ role: "user", content: prompt }],
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.OPENROUTER}`,
            "Content-Type": "application/json",
            timeout: 10000,
          },
        }
      );

      const raw = response.data.choices[0].message.content;
      const match = raw.match(/\{[\s\S]*?\}/);
      if (!match) {
        console.warn(`Modello ${model}: nessun oggetto JSON trovato.`);
        continue;
      }

      const clean = sanitizeJsonString(match[0]);
      try {
        const parsed = JSON.parse(clean);
        if (!parsed.content || typeof parsed.content !== "string") {
          console.warn(`Modello ${model}: campo "content" non valido.`);
          continue;
        }
        console.info(`Modello usato: ${model}`);
        return { parsed, model };
      } catch (parseError) {
        console.error(
          `Modello ${model}: errore parsing JSON`,
          parseError.message
        );
        continue;
      }
    } catch (error) {
      const code = error.response?.status || error.code;
      const message = error.response?.data?.error?.message || error.message;
      console.warn(`Modello ${model}: errore ${code} - ${message}`);

      if (code === 429 || code === 503) {
        continue;
      } else {
        break;
      }
    }
  }

  console.error("Tutti i modelli hanno fallito.");
  return null;
}

// -------------------- Rotte per Wiki Garden
app.get(
  "/get-guides",
  isLoggedIn,
  catchAsync(async (req, res) => {
    const guides = await WikiGarden.find();
    res.json(guides);
  })
);

app.post(
  "/create-guide",
  isLoggedIn,
  catchAsync(async (req, res) => {
    const { title, description, category } = req.body.promptGuide;
    const aiData = await generateGuideArticle({ title, description, category });
    const { parsed, model } = aiData;
    const data = {
      title: title,
      categories: category,
      description: description,
      content: parsed.content,
      model: model,
    };
    const wiki = new WikiGarden(data);
    wiki.save();
    res.sendStatus(200);
  })
);

app.get(
  "/wiki-search",
  isLoggedIn,
  catchAsync(async (req, res) => {
    const { search } = req.query;
    const trimmed = search?.trim();
    if (!trimmed || trimmed.length <= 3) {
      return res.json([]);
    }

    const short = trimmed.slice(0, -1);
    const query = {};
    const escapeRegex = (text) =>
      text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    const saniSearch = escapeRegex(trimmed);
    const saniShort = escapeRegex(short);
    const regex = new RegExp(saniSearch, "i");
    const regexShort = new RegExp(saniShort, "i");

    query.$or = [
      { title: { $regex: regex } },
      { title: { $regex: regexShort } },
    ];

    const results = await WikiGarden.find(query);
    res.json(results);
  })
);

// -------------------- TREFLE
async function getImageTrefle(plant) {
  try {
    const response = await axios.get(
      "https://trefle.io/api/v1/species/search",
      {
        params: { q: plant },
        headers: {
          Authorization: `Bearer ${process.env.TREFLE}`,
          Accept: "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Errore generazione dati pianta:",
      error.response?.data || error.message
    );
    return null;
  }
}

// -------------------- Gestione rotte PLANT

app.get(
  "/search-plant",
  isLoggedIn,
  catchAsync(async (req, res) => {
    const query = req.query.q;
    const results = await Plant.find({
      $or: [
        { scientificName: { $regex: query, $options: "i" } },
        { commonName: { $regex: query, $options: "i" } },
      ],
    });
    res.json(results);
  })
);

app.post(
  "/create-botanic-plant",
  isLoggedIn,
  catchAsync(async (req, res) => {
    const { name, variety } = req.body.promptPlant;
    const aiData = await generateStructuredPlantData({ name, variety });
    const newPlant = new Plant(aiData);
    let trefleDataVariety, trefleDataName, arrayImagesVariety, arrayImagesName;
    const extractImageUrls = (data) =>
      data?.filter((el) => el.image_url).map((el) => el.image_url) || [];
    if (aiData.scientificVariety) {
      trefleDataVariety = await getImageTrefle(aiData.scientificVariety);
    }
    if (trefleDataVariety?.data) {
      arrayImagesVariety = extractImageUrls(trefleDataVariety.data);
    }

    if (!arrayImagesVariety || arrayImagesVariety.length < 1) {
      trefleDataName = await getImageTrefle(aiData.scientificName);
      arrayImagesName = extractImageUrls(trefleDataName.data);
      newPlant.images = arrayImagesName;
    } else {
      newPlant.images = arrayImagesVariety;
    }
    await newPlant.save();
    res.json(newPlant);
  })
);

// -------------------- Gestione diario

app.post(
  "/store-diary/:gardenId/:plantId",
  isLoggedIn,
  upload.single("image"),
  catchAsync(async (req, res) => {
    const { gardenId, plantId } = req.params;
    const path = req.file?.path || "";
    const filename = req.file?.filename || "";
    const { title, date, content } = req.body;
    await Garden.findByIdAndUpdate(
      { _id: gardenId, owner: req.user.id },
      {
        $push: {
          "myPlants.$[plant].diary": {
            image: {
              url: path,
              filename: filename,
            },
            title: title,
            date: date,
            content: content,
          },
        },
      },
      {
        arrayFilters: [{ "plant._id": plantId }],
        new: true,
        runValidators: true,
      }
    );
    if (!updatedGarden) {
      return res
        .status(403)
        .json({ error: "Accesso negato o giardino non trovato" });
    }
    res.sendStatus(200);
  })
);

app.delete(
  "/delete-diary/:gardenId/:plantId/:idDiary",
  isLoggedIn,
  catchAsync(async (req, res) => {
    const { gardenId, plantId, idDiary } = req.params;
    const { filename } = req.body;

    await Garden.findByIdAndUpdate(
      { _id: gardenId, owner: req.user.id },
      {
        $pull: {
          "myPlants.$[plant].diary": { _id: idDiary },
        },
      },
      {
        arrayFilters: [{ "plant._id": plantId }],
      }
    );
    if (!updatedGarden) {
      return res
        .status(403)
        .json({ error: "Accesso negato o giardino non trovato" });
    } else {
      await cloudinary.uploader.destroy(filename);
    }
    res.sendStatus(200);
  })
);

// -------------------- Sezione METEO

app.get(
  "/weather-request",
  isLoggedIn,
  catchAsync(async (req, res) => {
    const gardens = await Garden.find({ owner: req.user.id }).select(
      "name location weather"
    );

    res.json(gardens);
  })
);

app.post(
  "/weather-update",
  isLoggedIn,
  catchAsync(async (req, res) => {
    const gardens = await Garden.find({ owner: req.user.id });
    const delay = (ms) => new Promise((res) => setTimeout(res, ms));
    const newGardens = await Promise.all(
      gardens.map(async (garden, index) => {
        await delay(2000 * index);
        const url = `https://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHERAPI}&q=${garden.location.lat},${garden.location.lon}&days=3&aqi=yes&alerts=yes`;
        try {
          const response = await axios.get(url);
          const data = response.data;
          garden.weather.dataApi = data;
          garden.weather.updatedAt = new Date();
          const conditionText = encodeURIComponent(
            garden.weather.dataApi.current.condition.text
          );

          const translatedResponse = await axios.get(
            `https://api.mymemory.translated.net/get?q=${conditionText}&langpair=${"en"}|${"it"}`
          );
          const translatedText =
            translatedResponse.data.responseData.translatedText;
          garden.weather.dataApi.current.condition.text = translatedText;

          const alertsArray = garden.weather.dataApi.alerts.alert || [];
          const alertsIt = await Promise.all(
            alertsArray.map(async (alert) => {
              const alertToString = encodeURIComponent(
                `${alert.event} - ${alert.areas} (${alert.severity}) - Certainty: ${alert.certainty}. Instruction: ${alert.instruction}.`
                  .replace(/\n/g, " ")
                  .replace(/"/g, "")
              );
              const translatedResponseAlert = await axios.get(
                `https://api.mymemory.translated.net/get?q=${alertToString}&langpair=${"en"}|${"it"}`
              );
              const translatedAlert =
                translatedResponseAlert.data.responseData.translatedText;
              const newObj = {
                text: translatedAlert,
                effective: alert.effective,
                expires: alert.expires,
              };
              return newObj;
            })
          );
          garden.weather.dataApi.alertsIt = alertsIt;
          await garden.save();
          return garden;
        } catch (error) {
          console.error("Errore nella richiesta WeatherAPI:", error.message);
          return {
            name: garden.name,
            location: garden.location,
            weather: null,
            _id: garden._id,
          };
        }
      })
    );
    const response = newGardens.map((garden) => {
      const newObject = {
        name: garden.name,
        location: garden.location,
        weather: garden.weather || null,
        _id: garden._id,
      };
      return newObject;
    });
    res.json(response);
  })
);

// -------------------- Gestione errori e ascolto server
https: app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Qualcosa è andato storto";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    stack: process.env.NODE_ENV !== "production" ? err.stack : undefined,
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server in ascolto sulla porta ${port}`);
});
