import React, { Component } from 'react'
import { Redirect } from 'react-router'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import  * as actions from '../../../redux/actions';

import VoiceForm from './VoiceForm';

class VoiceEditor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            goToRercorder: {
                active: false
            }
        }
    }

    onSaveAudio = async (data) => {
        let formObject = {
            'voice_title': data.voice_title,
            'voice_description': data.voice_description
        }

        this.props.actions.editVoice(this.props.voiceInfo._id, formObject);

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
                    voice={this.props.voiceInfo}
                    onSaveAudio={this.onSaveAudio}
                    audioUrl={this.props.audioUrl} />
            </div>
        )
    }
}

function mapStateToProps(state, props) {
  const voice = state.data.entities.voices && state.data.entities.voices[props.match.params.id];
  const audioUrl = voice && new URL(voice.voice_audio, window.location.origin);

  return {
    voiceInfo: voice || {},
    audioUrl: audioUrl || ''
  }
}

function mapDispatchToProps(dispatch) {
    return {
      actions: bindActionCreators(actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VoiceEditor);
