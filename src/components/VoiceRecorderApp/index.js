import React, { Component } from 'react'

import './styles.css';

import VoiceList from './components/VoiceList';
import VoiceActions from './components/VoiceActions';

export default class VoiceRecorderApp extends Component {
  render() {
    return (
        <div className="container site-content">
            <div className="row">
                <div className="col-md-6">
                    <VoiceList/>
                </div>
                <div className="col-md-6">
                    <VoiceActions/>
                </div>
            </div>
        </div>
    )
  }
}
