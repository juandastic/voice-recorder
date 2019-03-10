import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

import VoicePlayer from '../../../VoicePlayer';

export default class VoiceListRow extends Component {
    constructor(props) {
        super(props);
    }

    onEditVoice() {
        this.props.editVoice(this.props.voice);
    }

    onDeleteVoice() {
        this.props.deleteVoice(this.props.voice);
    }

    render() {
        return (
            <li className="list-group-item d-flex justify-content-between align-items-center">
                <span>{this.props.voice.voice_title}</span>
                <div className="list-actions d-flex justify-content-between">
                    <button type="button" className="btn btn-outline-danger" onClick={this.onDeleteVoice.bind(this)}>
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                    <button type="button" className="btn btn-outline-primary" onClick={this.onEditVoice.bind(this)}>
                        <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <VoicePlayer audioUrl={this.props.audioUrl.toString()}/>
                </div>
            </li>
        )
  }
}
