import React, { Component } from 'react'
import WaveSurfer from 'wavesurfer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faStop } from '@fortawesome/free-solid-svg-icons';

import './styles.css';

export default class VoicePlayer extends Component {
    constructor(props) {
        super(props);

        this.playPause = this.playPause.bind(this);
        this.simplePlay = this.simplePlay.bind(this);

        this.state = {
            isPlaying: false
        }
    }

    componentDidMount() {
        if (this.props.visualPlayer) {
            this.wavesurfer = WaveSurfer.create({
                container: '#waveform',
                waveColor: '#319def'
            });
            this.wavesurfer.load(this.props.audioUrl);
        } else {
            this.audio = new Audio(this.props.audioUrl);
        }
    }

    playPause() {
        this.wavesurfer.playPause();

        this.setState({
            isPlaying: this.wavesurfer.isPlaying()
        })
    }

    renderVisualPlayer() {
        let button;

        if (this.state.isPlaying) {
            button = (
                <button type="button" className="btn btn-danger play-pause" onClick={this.playPause}>
                    <FontAwesomeIcon icon={faStop} />
                </button>
            );
        } else {
            button = (
                <button type="button" className="btn btn-primary play-pause" onClick={this.playPause}>
                    <FontAwesomeIcon icon={faPlay} />
                </button>
            );
        }

        return (
            <div className="voice-player">
                <div id="waveform"></div>
                { button }
            </div>
        )
    }

    simplePlay() {
        this.audio.onended = () => {
            this.audio.pause();
            this.setState({
                isPlaying: !this.audio.paused
            })
        };

        this.audio.paused ? this.audio.play() : this.audio.pause();

        this.setState({
            isPlaying: !this.audio.paused
        })
    }

    renderSimplePlayer() {
        let button;

        if (this.state.isPlaying) {
            button = (
                <button type="button" className="btn btn-outline-danger rounded-circle" onClick={this.simplePlay}>
                    <FontAwesomeIcon icon={faStop} />
                </button>
            );
        } else {
            button = (
                <button type="button" className="btn btn-outline-primary rounded-circle" onClick={this.simplePlay}>
                    <FontAwesomeIcon icon={faPlay} />
                </button>
            );
        }

        return (
            <div>
                { button }
            </div>
        )
    }
    render() {
        return this.props.visualPlayer ? this.renderVisualPlayer() : this.renderSimplePlayer();
    }
}
