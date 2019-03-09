const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const Voice = require('./voice.model');
const PORT = 4000;
const multer  = require('multer');

const upload = multer({ dest: 'uploads/' })

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/voices', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

const voiceRoutes = express.Router();
app.use('/voices', voiceRoutes);

voiceRoutes.route('/').get(function(req, res) {
    Voice.find(function(err, voices) {
        if (err) {
            console.log(err);
        } else {
            res.json(voices);
        }
    });
});

voiceRoutes.route('/add').post(upload.single('voice_file'),function(req, res) {
    let voiceObject = {
        voice_title: req.body.voice_title,
        voice_description: req.body.voice_description,
        voice_audio: req.file.path
    };
    let voice = new Voice(voiceObject);

    voice.save()
        .then(voice => {
            res.status(200).json(voice);
        })
        .catch(err => {
            res.status(400).send('adding new voice failed');
        });
});

app.use(express.static('build'));
app.use('/uploads', express.static('uploads'));

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});