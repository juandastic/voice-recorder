import React, { Component } from 'react'
import Axios from 'axios';

import './styles.css';

import VoiceList from './components/VoiceList';
import VoiceActions from './components/VoiceActions';

export default class VoiceRecorderApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            voiceList: []
        };
    }

    updateVoiceList(voice) {
        const { voiceList } = this.state;
        voiceList.push(voice);
    }

    componentDidMount() {
        Axios.get('/voices').then(res => {
            this.setState({
                voiceList : res.data
            });
        });
    }

    render() {
        return (
            <div className="container site-content">
                <div className="row">
                    <div className="col-md-6">
                        <VoiceList voiceList={this.state.voiceList}/>
                    </div>
                    <div className="col-md-6">
                        <VoiceActions updateVoiceList={this.updateVoiceList.bind(this)}/>
                    </div>
                </div>
            </div>
        )
    }
}
