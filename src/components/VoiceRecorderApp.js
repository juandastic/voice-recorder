import React, { Component } from 'react'
import Axios from 'axios';

import './VoiceRecorderApp.css';

import VoiceList from './components/VoiceList';
import VoiceActions from './components/VoiceActions';

export default class VoiceRecorderApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            voiceList: []
        };
    }

    updateVoiceList() {
        this.getVoiceList();
    }

    async getVoiceList () {
        const result = await Axios.get('/voices');
        this.setState({
            voiceList : result.data
        });
    }

    componentDidMount() {
        this.getVoiceList();
    }

    render() {
        return (
            <div className="container site-content">
                <div className="row">
                    <div className="col-md-6">
                        <VoiceList
                            updateVoiceList={this.updateVoiceList.bind(this)}
                            voiceList={this.state.voiceList}/>
                    </div>
                    <div className="col-md-6">
                        <VoiceActions updateVoiceList={this.updateVoiceList.bind(this)}/>
                    </div>
                </div>
            </div>
        )
    }
}
