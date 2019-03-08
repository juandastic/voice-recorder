import React, { Component } from 'react'

import logo from '../../logo.png';

export default class Header extends Component {
  render() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light mb-20">
            <div className="navbar-brand">
              <img src={logo} alt="atexto"/>
            </div>
            <div className="navbar-brand pull-right">Voice Recorder - Juan David Gómez</div>
        </nav>
    )
  }
}
