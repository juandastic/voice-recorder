import React, { Component } from 'react'
import { Redirect } from 'react-router'
import { withRouter } from 'react-router-dom';
import Axios from 'axios';

import VoiceForm from '../VoiceForm';

class VoiceCreator extends Component {
    constructor(props) {
        super(props);

        if (!this.props.location.state) {
            this.state = {
                goToRercorder: {
                    active: true
                }
            };
        } else {
            this.audioURL = URL.createObjectURL(this.props.location.state.audio);
            this.audioBlob = this.props.location.state.audio;

            this.state = {
                goToRercorder: {
                    active: false
                }
            };
        }
    }

    async onSaveAudio(data) {
        let formObject = new FormData();
        formObject.append('voice_file', this.audioBlob, 'audio');
        formObject.append('voice_title', data.voice_title);
        formObject.append('voice_description', data.voice_description);

        await Axios.post('/voices/add', formObject);

        this.props.updateVoiceList();
        this.setState({
            goToRercorder: {
                active: true
            }
        });
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

export default withRouter(VoiceCreator);