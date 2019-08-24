const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "./.env") });

// Seeds file that remove all users and licences
// then add 2 users and two mockup licences

// To execute this seed, run from the root of the project
// $ node seeds.js

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./models/User");
const Licence = require("./models/Licence");
const licenceKey = require("license-key-gen");

const fs = require("fs-extra");

const bcryptSalt = 10;

require("./configs/database");

let users = [
  {
    username: "admin",
    password: bcrypt.hashSync("admin", bcrypt.genSaltSync(bcryptSalt))
  },
  {
    username: "user001",
    password: bcrypt.hashSync("azerty123", bcrypt.genSaltSync(bcryptSalt))
  }
];

let licences = [
  {
    client: {
      email: "anthonycpon@hotmil.it",
      password: "rosebery",
      name: "Anothony Cpon",
      phone: "558 107 2009",
      adress: "Trinaty Avenue 68",
      zip: "1337",
      country: "USA",
      state: "California"
    },
    meta: {
      numberPosts: 4,
      duration: 90
    }
  },
  {
    client: {
      email: "EliraCliont@freemail.com",
      password: "cliont1986",
      name: "Eliria Cliont",
      phone: "9558 1070 29",
      adress: "2nd Buffelton street house 11",
      zip: "17331",
      country: "USA",
      state: "Arizona"
    },
    meta: {
      numberPosts: 1,
      duration: 360
    }
  }
];

licences.forEach(licence => {
  try {
    let result = licenceKey.createLicense({
      info: licence.client,
      prodCode: "L2048"
    });
    licence.licence = result.license;
    licence.licenceCode = result.license.split("-").join("");
  } catch (err) {
    next(err);
  }
});

Licence.deleteMany()
  .then(() => {
    fs.removeSync("./afnor");
    return Licence.create(licences);
  })
  .then(licecesCreated => {
    console.log(
      `${
        licecesCreated.length
      } licences were added to the database with the following id: `
    );
    licecesCreated.map(l => {
      console.log(l._id);
      let filePath = `./afnor/${l.licence}`;
      fs.mkdir(filePath, { recursive: true }, err => {
        if (err) next(err);
        let data = JSON.stringify(l, null, 2);
        fs.writeFile(filePath + "/" + l.licenceCode + ".json", data, err => {
          if (err) next(err);
        });
      });
    });
    console.log("done!");
  })
  .then(() => {
    mongoose.disconnect();
  })
  .catch(err => {
    mongoose.disconnect();
    throw err;
  });

User.deleteMany()
  .then(() => {
    return User.create(users);
  })
  .then(usersCreated => {
    console.log(`${usersCreated.length} users created with the following id:`);
    console.log(usersCreated.map(user => user._id));
  })
  .then(() => {
    // Close properly the connection to Mongoose
    mongoose.disconnect();
  })
  .catch(err => {
    mongoose.disconnect();
    throw err;
  });
