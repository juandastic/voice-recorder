import React, { Component } from 'react'
import { Route } from 'react-router-dom';

import './VoiceActions.css';

import VoiceRecorder from './components/VoiceRecorder';
import VoiceCreator from './components/VoiceCreator';
import VoiceEditor from './components/VoiceEditor';

export default class VoiceActions extends Component {
  render() {
    return (
      <div className="container">
        <Route path="/" exact component={VoiceRecorder} />
        <Route path="/create" component={VoiceCreator} />
        <Route path="/edit/:id" component={VoiceEditor} />
      </div>
    )
  }
}
