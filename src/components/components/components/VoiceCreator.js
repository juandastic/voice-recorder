import React, { Component } from 'react'
import { Redirect } from 'react-router'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import  * as actions from '../../../redux/actions';

import VoiceForm from './VoiceForm';

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

    onSaveAudio = async (data) => {
        let formObject = new FormData();
        formObject.append('voice_file', this.audioBlob, 'audio');
        formObject.append('voice_title', data.voice_title);
        formObject.append('voice_description', data.voice_description);

        this.props.actions.addVoice(formObject);
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
                    onSaveAudio={this.onSaveAudio}
                    audioUrl={this.audioURL} />
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
      actions: bindActionCreators(actions, dispatch)
    }
}

export default connect(null, mapDispatchToProps)(VoiceCreator);
