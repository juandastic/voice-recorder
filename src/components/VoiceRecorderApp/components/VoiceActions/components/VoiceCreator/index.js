import React, { Component } from 'react'
import VoiceForm from '../VoiceForm';

export default class VoiceCreator extends Component {
    constructor(props) {
        super(props);
        this.audioURL = URL.createObjectURL(this.props.location.state.audio);
    }

    componentDidMount() {

        // const player = new Audio(audioURL);
        // player.onended = () => {
        //     player.pause();
        // };
        // player.play();
    }

    render() {
        return (
            <div className="voice-recorder">
                <h2 className="title-section">Guarda tu grabación</h2>
                <VoiceForm audioUrl={this.audioURL} />
            </div>
        )
    }
}
