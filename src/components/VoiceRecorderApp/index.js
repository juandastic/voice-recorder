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

    updateVoiceList() {
        this.getVoiceList();
    }

    getVoiceList () {
        Axios.get('/voices').then(res => {
            this.setState({
                voiceList : res.data
            });
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
