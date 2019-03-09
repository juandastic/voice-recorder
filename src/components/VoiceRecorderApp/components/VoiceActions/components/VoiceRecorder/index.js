import React, { Component } from 'react'
import { Redirect } from 'react-router'

import './styles.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faStop } from '@fortawesome/free-solid-svg-icons';

export default class VoiceRecorder extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isRecordingAllowed: false,
            isRecording: false,
            timer: {
                time: 0,
                start: 0
            },
            recordedChunks: [],
            goToCreate: {
                active: false,
                audio: {}
            }
        };
    }

    componentDidMount() {
        navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            this.mediaRecorder = new window.MediaRecorder(stream);

            this.mediaRecorder.addEventListener('dataavailable', e => {
                if (e.data.size > 0) {
                    this.collectChunks(e.data);
                }
            });

            this.mediaRecorder.addEventListener('stop', () => {
                const audioBlob = new Blob(this.state.recordedChunks);
                this.processRecord(audioBlob);
            });

            this.setState({ isRecordingAllowed: true });
        })
        .catch(err => {
            console.log(err.message);
        });
    }

    collectChunks = (data) => {
        const { recordedChunks } = this.state;

        recordedChunks.push(data);
        this.setState({ recordedChunks });
    }

    processRecord = (audio) => {
        this.setState({
            recordedChunks: [],
            goToCreate: {
                active: true,
                audio: audio
            }
        });
    }

    onRecordingStart = () => {

        this.setState({
            isRecording: true,
            timer: {
                time: this.state.timer.time,
                start: Date.now() - this.state.timer.time
            }
        }, () => {
            this.mediaRecorder.start();
            this.timer = setInterval(() => this.setState({
                timer: {
                    time: Date.now() - this.state.timer.start,
                    start: this.state.timer.start
                }
            }), 1);
        });
    }

    onRecordingEnd = () => {
        this.setState({ isRecording: false }, () => {
            this.mediaRecorder.stop();
            clearInterval(this.timer);
        });
    }

    render() {
        const { isRecordingAllowed, isRecording, goToCreate, timer } = this.state;
        let button = (<h3>Tu Navegador no permite grabar audio</h3>);
        let time;

        if (goToCreate.active) {
            return <Redirect to={{
                pathname: "/create",
                state: { audio: goToCreate.audio }
            }} />
        }

        if (isRecordingAllowed) {
            if (!isRecording) {
                button = (
                    <button type="button" className="btn btn-outline-primary record-button" onClick={this.onRecordingStart}>
                        <FontAwesomeIcon icon={faMicrophone} />
                    </button>
                );
            } else {
                button = (
                    <button type="button" className="btn btn-outline-danger record-button mb-3" onClick={this.onRecordingEnd}>
                        <FontAwesomeIcon icon={faStop} />
                    </button>
                );

                var ms = timer.time;
                ms = 1000*Math.round(ms/1000); // round to nearest second
                var d = new Date(ms);
                time = (<span> {d.getMinutes() + ':' + d.getSeconds()} </span>);
            }
        }

        return (
            <div className="voice-recorder">
                <h2 className="title-section">Graba tu audio</h2>
                { button }
                { time }
            </div>
        )
    }
}
