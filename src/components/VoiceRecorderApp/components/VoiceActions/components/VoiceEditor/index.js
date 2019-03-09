import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';

class VoiceEditor extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                VoiceEditor
            </div>
        )
    }
}

export default withRouter(VoiceEditor);
