import React, { Component } from 'react'
import { Redirect } from 'react-router'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import  * as actions from '../../redux/actions';

import './VoiceList.css';
import VoiceListRow from './components/VoiceListRow';

class VoiceList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      goToEdit: {
        active: false,
        voiceId: ''
      },
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      goToEdit:{
        active: false,
      }
    })
  }

  editVoice = (voice) => {
    this.setState({
      goToEdit:{
        active: true,
        voiceId: voice._id
      }
    })
  }

  deleteVoice = async (voice) => {
    this.props.actions.deleteVoice(voice._id);
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
            key={e._id}
            voice={e}
            audioUrl={audioUrl}
            deleteVoice={this.deleteVoice}
            editVoice={this.editVoice}
          />
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

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(VoiceList);
