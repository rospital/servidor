const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.autenticarUsuario = async (req, res) => {
	const errores = validationResult(req);

	if (!errores.isEmpty()) {
		return res.status(400).json({ errores: errores.array() });
	}

	const { username, password } = req.body;

	try {
		let usuario = await Usuario.findOne({ username });
		if (!usuario) {
			return res.status(400).json({ msg: 'El usuario no existe' });
		}

		const passCorrecto = await bcryptjs.compare(password, usuario.password);
		if (!passCorrecto) {
			return res.status(400).json({ msg: 'Password incorrecto' });
		}

		// crear y firmar el JWT

		const payload = {
			usuario: {
				id: usuario.id
			}
		};

		jwt.sign(
			payload,
			process.env.SECRETA,
			{
				expiresIn: 3600
			},
			(error, token) => {
				if (error) throw error;
				// Mensaje de confirmacion
				res.json({ token });
			}
		);
	} catch (error) {
		console.log(error);
	}
};
