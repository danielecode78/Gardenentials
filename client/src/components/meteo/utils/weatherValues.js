export const airQuality = [
  "Non indicata",
  "Buona",
  "Moderata",
  "Malsana per soggetti vulnerabili",
  "Malsana",
  "Molto malsana",
];

export const uvIndex = (value) => {
  if (value < 2.5) {
    return "Basso";
  } else if (value < 5) {
    return "Moderato";
  } else if (value < 7) {
    return "Alto";
  } else if (value < 10) {
    return "Molto alto";
  } else if (value >= 11) {
    return "Estremo";
  } else {
    return "Non disponibile";
  }
};
