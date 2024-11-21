const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();

const API_KEY = 'd2830a151e2d5ae79ee56b3bf8035c9728d27a1c75fbd2fe89eff5f11c57f078c0f93ae1';
const API_URL = 'https://sedsa.api-us1.com';

// Ruta para la búsqueda
router.get('/search', async (req, res) => {
    const email = req.query.email;

    if (!email) {
        return res.status(400).json({ message: 'El email es obligatorio' });
    }

    try {
        const response = await fetch(`${API_URL}/api/3/contacts`, {
            method: 'GET',
            headers: { 'Api-Token': API_KEY },
            qs: { email },
        });

        if (response.ok) {
            const data = await response.json();
            if (data.contacts && data.contacts.length > 0) {
                res.status(200).json({ message: `Contacto encontrado: ${email}` });
            } else {
                res.status(404).json({ message: 'El contacto no existe. Comuníquese con el equipo de Marketing y Operaciones.' });
            }
        } else {
            res.status(response.status).json({ message: `Error en la solicitud: ${response.status}` });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }
});

module.exports = router;
