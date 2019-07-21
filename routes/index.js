const express = require('express');
const { isLoggedIn } = require('../middleware');
const router = express.Router();

/* const NodeRSA = require('node-rsa');
const key = new NodeRSA({ b: 2048 });

router.post('/encrypt', (req, res, next) => {
	let text = req.body.message;
	res.send({
		original: text,
		encrypted: key.encrypt(text, 'base64')
	});
});

router.post('/encrypt_p', (req, res, next) => {
	let text = req.body.message;
	res.send({
		original: text,
		encrypted: key.encryptPrivate(text, 'base64')
	});
});

router.post('/decrypt_p', (req, res, next) => {
	let text = req.body.message;
	res.send({
		original: text,
		decrypted: key.decryptPublic(text, 'utf8')
	});
});

router.post('/decrypt', (req, res, next) => {
	let text = req.body.message;
	res.send({
		original: text,
		decrypted: key.decrypt(text, 'utf8')
	});
});
 */
router.get('/secret', isLoggedIn, (req, res, next) => {
	req.user.password = undefined;
	res.json({
		secret: 42,
		user: req.user
	});
});

module.exports = router;
