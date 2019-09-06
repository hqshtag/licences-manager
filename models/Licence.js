const mongoose = require("mongoose");

const licenceSchema = new mongoose.Schema({
  licence: { type: String, required: true },
  licenceCode: { type: String, required: true },
  client: {
    email: { type: String, required: true },
    password: { type: String, required: true },
    name: String,
    phone: String,
    address: String,
    zip: String,
    country: String,
    state: String
  },
  legal: {
    TVA: String,
    SIRET: String,
    SIREN: String
  },
  meta: {
    creationDate: { type: Date, default: Date.now },
    numberPosts: { type: Number, default: 1 }, //number of posts
    duration: { type: Number, default: 30 }, //number in days days
    state: { type: String, default: "active" } //something like active / disabled / inactive ..
  }
});

const Licence = mongoose.model("Licence", licenceSchema);

module.exports = Licence;
