import React, { Component } from 'react'

export default class Header extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light mb-20 d-flex justify-content-between align-items-center">
                <div className="navbar-brand">
                    Voice Recorder
                </div>
                <div className="navbar-brand">Juan David Gómez</div>
            </nav>
        )
    }
}
