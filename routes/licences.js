const express = require("express");
const fs = require("fs");

const licenceKey = require("license-key-gen");
const Licence = require("../models/Licence");

const bcrypt = require("bcrypt");

const {
  verifyLicenceId,
  handleLicenceExistance,
  verifyNewLicence,
  verifyLicenceUpdateRequest
} = require("../middleware/licencesValidator");

const router = express.Router();

router.param("id", verifyLicenceId);

//Route to get all licences
router.get("/", (req, res, next) => {
  Licence.find()
    .then(licences => {
      if (licences) res.status(200).json({ licences });
      else
        res.status(404).json({
          message: "No licence is registred on the database"
        });
    })
    .catch(err => next(err));
});

//Route to get One licence
router.get("/:id", (req, res, next) => {
  let licenceId = req.params.id;
  Licence.findById(licenceId)
    .then(licence => {
      if (licence) res.status(200).json({ licence });
      else
        res.status(404).json({
          message: "No licence was found with the given ID"
        });
    })
    .catch(err => next(err));
});

//Route to update licence
router.put("/:id", verifyLicenceUpdateRequest, (req, res, next) => {
  let licenceId = req.params.id;
  let updatedLicence = req.body;
  Licence.findByIdAndUpdate(
    licenceId,
    updatedLicence,
    { new: true },
    (err, result) => {
      if (err) next(err);
      if (result) {
        let data = JSON.stringify(result, null, 2);
        let filePath = `./afnor/${result.licence}/${result.licenceCode}.json`;
        fs.writeFile(filePath, data, error => {
          if (error) next(error);
          console.log("updated file");
        });
        res.status(200).json({ result });
      } else
        res.status(404).json({
          message: "No corrosponding licence was found in the database"
        });
    }
  );
});

//Route to delete licence
router.delete("/:id", (req, res, next) => {
  let licenceId = req.params.id;
  Licence.findByIdAndRemove(licenceId, (error, result) => {
    if (error) next(error);
    if (result) {
      let filePath = `./afnor/${result.licence}/${result.licenceCode}.json`;
      result.meta.state = "DELETED";
      let data = JSON.stringify(result, null, 2);
      fs.writeFile(filePath, data, err => {
        if (err) next(err);
        console.log("Added DELETED atribute to file");
      });
      res.status(200).json({
        message: "Licence successfully deleted from the database",
        payload: result
      });
    } else
      res.status(404).json({
        message: "No corrosponding licence was found in the database"
      });
  });
});

//Route to post licence
router.post(
  "/",
  handleLicenceExistance,
  verifyNewLicence,
  async (req, res, next) => {
    let input = req.body;
    let newLicence = new Licence();
    try {
      let result = licenceKey.createLicense({
        info: input.client,
        prodCode: "L2048"
      });
      newLicence.licence = result.license;
      newLicence.licenceCode = result.license.split("-").join("");

      const salt = await bcrypt.genSalt(6);
      const hashedPass = await bcrypt.hash(input.client.password, salt);
      input.client.password = hashedPass;

      Object.assign(newLicence.client, input.client);
      Object.assign(newLicence.meta, input.meta);

      let filePath = `./afnor/${result.license}`;
      fs.mkdir(filePath, { recursive: true }, err => {
        if (err) next(err);
        // console.log("folders created");
      });
      newLicence.save(err => {
        if (err) next(err);
        let data = JSON.stringify(newLicence, null, 2);
        fs.writeFile(
          filePath + "/" + newLicence.licenceCode + ".json",
          data,
          err => {
            if (err) next(err);
            res.status(201).json(newLicence);

            // console.log("written data to file");
          }
        );
      });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
