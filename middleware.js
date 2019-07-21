const verifyLicenceId = (req, res, next) => {
	let id = req.params.id;
	if (!id.match(/^[0-9a-fA-F]{24}$/)) {
		res.send({
			code: 400,
			message: 'Invalide licence Id.'
		});
	} else {
		next();
	}
};

const verifyPostRequestBody = (req, res, next) => {
	let input = req.body;

	if (!input.hasOwnProperty('client')) {
		res.send({
			code: 400,
			message: 'Bad Request'
		});
	}
	if (!(input.client.hasOwnProperty('email') && input.client.hasOwnProperty('password'))) {
		res.send({
			code: 400,
			message: 'You should supply both the client email and password'
		});
	}

	next();
};

const isLoggedIn = (req, res, next) => {
	if (req.isAuthenticated()) next();
	else next({ status: 403, message: 'Unauthorized' });
};

module.exports = { verifyLicenceId, verifyPostRequestBody, isLoggedIn };
