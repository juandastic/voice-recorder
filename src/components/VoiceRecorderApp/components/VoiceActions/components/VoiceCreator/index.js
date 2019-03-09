import React, { Component } from 'react'
import VoiceForm from '../VoiceForm';
import Axios from 'axios';

export default class VoiceCreator extends Component {
    constructor(props) {
        super(props);
        this.audioURL = URL.createObjectURL(this.props.location.state.audio);
    }

    saveAudio(data) {

        let formObject = new FormData();
        data.append('file', this.props.location.state.audio);
        data.append('voice_title', data.voice_title);
        data.append('voice_description', data.voice_description);

        Axios.post('/voices/add', formObject)
        .then(res => console.log(res.data));

        console.log('Save this with axios ', data);
    }

    render() {
        return (
            <div className="voice-recorder">
                <h2 className="title-section">Guarda tu grabación</h2>
                <VoiceForm onSaveAudio={this.saveAudio} audioUrl={this.audioURL} />
            </div>
        )
    }
}
