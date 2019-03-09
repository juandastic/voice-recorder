import React, { Component } from 'react'
import { Redirect } from 'react-router'
import VoicePlayer from '../VoicePlayer';

import './styles.css';

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

    componentDidMount() {
        // setTimeout(() => {
        //     this.setState({goToEdit:{
        //         active: true,
        //         voiceId: '2'
        //     }})
        // }, 10000);
    }

    render() {
        let redirect;
        if (this.state.goToEdit.active === true) {
            redirect =  (<Redirect to={"/edit/"+this.state.goToEdit.voiceId} />);
        }

        let listContent;
        if (this.props.voiceList.length > 0) {
            listContent = this.props.voiceList.map((e, k) => {
                const audioUrl = new URL(e.voice_audio, window.location.href);
                return (
                    <li className="list-group-item">
                        <span>{e.voice_title}</span>
                        <VoicePlayer audioUrl={audioUrl.toString()}/>
                    </li>
                )
            });
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
