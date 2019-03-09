import React, { Component } from 'react'
import { Redirect } from 'react-router'

import './styles.css';
import VoicePlayer from '../../../VoicePlayer';

export default class VoiceForm extends Component {
    constructor(props) {
        super(props);

        this.onChangeVoiceTitle = this.onChangeVoiceTitle.bind(this);
        this.onChangeVoiceDescription = this.onChangeVoiceDescription.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onCancel = this.onCancel.bind(this);

        this.state = {
            voice_title: '',
            voice_description: '',
            goToRercorder: {
                active: false
            }
        }
    }

    onChangeVoiceTitle(e) {
        this.setState({
            voice_title: e.target.value
        });
    }

    onChangeVoiceDescription(e) {
        this.setState({
            voice_description: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const audioObject = {
            voice_title: this.state.voice_title,
            voice_description: this.state.voice_description,
            audioUrl: this.props.audioUrl
        }

        this.props.onSaveAudio(audioObject);
    }

    onCancel() {
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
            <form className="voice-form" onSubmit={this.onSubmit}>
                <VoicePlayer visualPlayer={true} audioUrl={this.props.audioUrl}/>
                <div className="form-group">
                    <label>Titulo: </label>
                    <input  type="text"
                            className="form-control"
                            value={this.state.voice_title}
                            onChange={this.onChangeVoiceTitle}/>
                </div>
                <div className="form-group">
                    <label>Descripción: </label>
                    <textarea className="form-control"
                              rows="3"
                              value={this.state.voice_description}
                              onChange={this.onChangeVoiceDescription}>
                    </textarea>
                </div>
                <div className="form-group">
                    <input type="submit" value="Guardar Audio" className="btn btn-primary" />
                    <button type="button" className="btn btn-outline-danger float-right" onClick={this.onCancel}>
                        Cancelar
                    </button>
                </div>
            </form>
        )
    }
}
