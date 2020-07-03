const Clarifai = require('clarifai');

// Clarifai API key
const app = new Clarifai.App({
    apiKey: '0513f64863ff45f7abfff9e22089b080'
  });

const handleApiCall = (req, res) => {
    app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
        res.json(data)
    })
    .catch(err => res.status(400).json('Unable to work with API'))
}

const handleImage = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0]);
    })
    .catch(err => res.status(400).json('Unable to get image entries'))
}

module.exports = {
    handleImage,
    handleApiCall
}