import React, { Component } from 'react'
import { Redirect } from 'react-router'
import Axios from 'axios';

import './styles.css';
import VoiceListRow from './components/VoiceListRow';

export default class VoiceList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            goToEdit: {
                active: false,
                voiceId: ''
            },
        };
    }

    editVoice(voice) {
        this.setState({
            goToEdit:{
                active: true,
                voiceId: voice._id
            }
        })
    }

    deleteVoice(voice) {
        Axios.delete(`/voices/${voice._id}`).then(res => {
            this.props.updateVoiceList();
        });
    }

    render() {
        let redirect;
        if (this.state.goToEdit.active === true) {
            redirect =  (<Redirect to={"/edit/"+this.state.goToEdit.voiceId} />);
        }

        let listContent;
        if (this.props.voiceList.length > 0) {
            listContent = this.props.voiceList.map((e, k) => {
                const audioUrl = new URL(e.voice_audio, window.location.origin);
                return (
                    <VoiceListRow
                        voice={e}
                        audioUrl={audioUrl}
                        deleteVoice={this.deleteVoice.bind(this)}
                        editVoice={this.editVoice.bind(this)}/>
                )
            });
        } else {
            listContent = (
                <li className="list-group-item d-flex justify-content-between align-items-center">
                    <span>No se tiene audios</span>
                </li>
            )
        }

        return (
            <div className="voice-list">
                <h2 className="title-section">Lista de audios</h2>
                <ul className="list-group">
                    { listContent }
                </ul>
                {redirect}
            </div>
        )
    }
}
