const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const multer  = require('multer');
const fs =  require('fs');
const path = require('path');
const Voice = require('./voice.model');
const PORT = 3000;

const upload = multer({ dest: 'uploads/' })

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://mongodb/voices', { useNewUrlParser: true });
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

voiceRoutes.route('/add').post(upload.single('voice_file'), function(req, res) {
    let voiceObject = {
        voice_title: req.body.voice_title,
        voice_description: req.body.voice_description,
        voice_audio: req.file.path
    };
    let voice = new Voice(voiceObject);

    voice.save()
        .then(voice => {
            res.json(req.body);
        })
        .catch(err => {
            res.status(400).send('adding new voice failed');
        });
});

voiceRoutes.route('/:id')
.get(function(req, res) {
    let id = req.params.id;
    Voice.findById(id, function(err, voice) {
        res.json(voice);
    });
})
.post(function(req, res) {
    Voice.findById(req.params.id, function(err, voice) {
        if (!voice)
            res.status(404).send("data is not found");
        else
            voice.voice_title = req.body.voice_title;
            voice.voice_description = req.body.voice_description;
            voice.save().then(voice => {
                res.json(voice);
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
})
.delete(function(req, res) {
    let id = req.params.id;
    Voice.findById(id, function(err, voice) {
        if (fs.existsSync(voice.voice_audio)) {
            fs.unlink(voice.voice_audio, (err) => {
                if (err) throw err;
                voice.remove(function (err) {
                    if (err) return handleError(err);
                    // deleted at most one tank document
                    res.json(voice);
                });
            });
        } else {
            voice.remove(function (err) {
                if (err) return handleError(err);
                // deleted at most one tank document
                res.json(voice);
            });
        }
    });
});


app.use(express.static('build'));
app.use('/uploads', express.static('uploads'));

app.get('*', function (req, res) {
    const index = path.join(__dirname, '../build', 'index.html');
    res.sendFile(index);
});

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});