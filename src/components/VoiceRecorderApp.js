import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import  * as actions from '../redux/actions';

import './VoiceRecorderApp.css';

import VoiceList from './components/VoiceList';
import VoiceActions from './components/VoiceActions';

class VoiceRecorderApp extends Component {
    componentDidMount = () => {
        this.props.actions.fetchVoices();
    }

    render() {
        return (
            <div className="container site-content">
                <div className="row">
                    <div className="col-md-6">
                        <VoiceList voiceList={this.props.voiceList} />
                    </div>
                    <div className="col-md-6">
                        <VoiceActions />
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state, props) {
  const voices = state.data.result.map(
    (id) => state.data.entities.voices[id]
  );

  return {
    voiceList: voices
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(VoiceRecorderApp));