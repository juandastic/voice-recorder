import React, { Component } from 'react'
import { Redirect } from 'react-router'
import { withRouter } from 'react-router-dom';
import Axios from 'axios';

import VoiceForm from '../VoiceForm';

class VoiceEditor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            voice: {},
            audioUrl: '',
            goToRercorder: {
                active: false
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        this.getVoiceInfo(nextProps.match.params.id);
    }

    componentDidMount() {
        this.getVoiceInfo(this.props.match.params.id);
    }

    async getVoiceInfo(id) {
        const result = await Axios.get(`/voices/${id}`);
        const audioUrl = new URL(result.data.voice_audio, window.location.origin);

        this.setState({
            voice: result.data,
            audioUrl: audioUrl.toString()
        });
    }

    async onSaveAudio(data) {
        let formObject = {
            'voice_title': data.voice_title,
            'voice_description': data.voice_description
        }

        await Axios.post(`/voices/${this.state.voice._id}`, formObject);

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
                <h2 className="title-section">Edita tu grabación</h2>
                <VoiceForm
                    voice={this.state.voice}
                    onSaveAudio={this.onSaveAudio.bind(this)}
                    audioUrl={this.state.audioUrl} />
            </div>
        )
    }
}

export default withRouter(VoiceEditor);
