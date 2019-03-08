import React, { Component } from 'react'
import { Redirect } from 'react-router'
import VoicePlayer from '../VoicePlayer';

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

        return (
            <div className="voice-list">
                <h2 className="title-section">Lista de audios</h2>
                <ul className="list-group">
                    <li className="list-group-item">Cras justo odio <VoicePlayer audioUrl="http://ia902606.us.archive.org/35/items/shortpoetry_047_librivox/song_cjrg_teasdale_64kb.mp3"/></li>
                    <li className="list-group-item">Dapibus ac facilisis in</li>
                    <li className="list-group-item">Morbi leo risus</li>
                    <li className="list-group-item">Porta ac consectetur ac</li>
                    <li className="list-group-item">Vestibulum at eros</li>
                </ul>
                {redirect}
            </div>
        )
    }
}
