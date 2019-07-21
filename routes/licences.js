const express = require('express');
const fs = require('fs-extra');

const licenceKey = require('license-key-gen');
const Licence = require('../models/Licence');

const { verifyLicenceId, verifyPostRequestBody, isLoggedIn } = require('../middleware');

const router = express.Router();

router.param('id', verifyLicenceId);
router.use(isLoggedIn);
//Route to get all licences
router.get('/', (req, res, next) => {
	Licence.find()
		.then((licences) => {
			if (licences) res.send({ licences });
			else
				res.send({
					status: 200,
					message: 'No licence is registred on the database'
				});
		})
		.catch((err) => next(err));
});

//Route to get One licence
router.get('/:id', (req, res, next) => {
	let licenceId = req.params.id;
	Licence.findById(licenceId)
		.then((licence) => {
			if (licence) res.send({ licence });
			else
				res.send({
					status: 404,
					message: 'No licence was found with the given ID'
				});
		})
		.catch((err) => next(err));
});

//Route to update licence
router.put('/:id', (req, res, next) => {
	let licenceId = req.params.id;
	let updatedLicence = req.body;
	Licence.findByIdAndUpdate(licenceId, updatedLicence, { new: true }, (err, result) => {
		if (err) next(err);
		if (result) {
			let data = JSON.stringify(result, null, 2);
			let filePath = `./afnor/${result.licence}/${result.licenceCode}.json`;
			fs.writeFile(filePath, data, (error) => {
				if (error) next(error);
				console.log('updated file');
			});
			res.send({ result });
		} else
			res.send({
				status: 404,
				message: 'No corrosponding licence was found in the database'
			});
	});
});

//Route to delete licence
router.delete('/:id', (req, res, next) => {
	let licenceId = req.params.id;
	Licence.findByIdAndRemove(licenceId, (error, result) => {
		if (error) next(error);
		if (result) {
			let filePath = `./afnor/${result.licence}/${result.licenceCode}.json`;
			result.meta.state = 'DELETED';
			let data = JSON.stringify(result, null, 2);
			fs.writeFile(filePath, data, (err) => {
				if (err) next(err);
				console.log('Added DELETED atribute to file');
			});
			res.send({
				status: 200,
				message: 'Licence successfully deleted from the database',
				payload: result
			});
		} else
			res.send({
				code: 404,
				message: 'No corrosponding licence was found in the database'
			});
	});
});

//Route to post licence
router.post('/', verifyPostRequestBody, (req, res, next) => {
	let input = req.body;
	let newLicence = new Licence();
	try {
		let result = licenceKey.createLicense({ info: input.client, prodCode: 'L2048' });
		newLicence.licence = result.license;
		newLicence.licenceCode = result.license.split('-').join('');

		Object.assign(newLicence.client, input.client);
		Object.assign(newLicence.meta, input.meta);

		let filePath = `./afnor/${result.license}`;
		fs.mkdir(filePath, { recursive: true }, (err) => {
			if (err) next(err);
			console.log('folders created');
		});
		newLicence.save((err) => {
			if (err) next(err);
			let data = JSON.stringify(newLicence, null, 2);
			fs.writeFile(filePath + '/' + newLicence.licenceCode + '.json', data, (err) => {
				if (err) next(err);
				console.log('written data to file');
			});
			res.send(newLicence);
		});
	} catch (err) {
		next(err);
	}
});

module.exports = router;
