import React, { Component } from 'react'
import { Redirect } from 'react-router'
import Axios from 'axios';

import VoiceForm from '../VoiceForm';

export default class VoiceCreator extends Component {
    constructor(props) {
        super(props);

        this.audioURL = URL.createObjectURL(this.props.location.state.audio);
        this.audioBlob = this.props.location.state.audio;

        this.state = {
            goToRercorder: {
                active: false
            }
        };
    }

    onSaveAudio(data) {
        let formObject = new FormData();
        formObject.append('voice_file', this.audioBlob, 'audio');
        formObject.append('voice_title', data.voice_title);
        formObject.append('voice_description', data.voice_description);

        Axios.post('/voices/add', formObject, {
            headers: {
                'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
            }
        })
        .then(res => {
            this.setState({
                goToRercorder: {
                    active: true
                }
            });
        });

        console.log('Save this with axios ', data);
    }

    render() {
        const { goToRercorder } = this.state;

        if (goToRercorder.active) {
            return <Redirect to="/"/>
        }

        return (
            <div className="voice-recorder">
                <h2 className="title-section">Guarda tu grabación</h2>
                <VoiceForm
                    onSaveAudio={this.onSaveAudio.bind(this)}
                    audioUrl={this.audioURL} />
            </div>
        )
    }
}
