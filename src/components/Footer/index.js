import React, { Component } from 'react'

import './styles.css'

export default class Footer extends Component {
  render() {
    return (
        <footer className="bg-light">
            <div className="text-center py-3">
                © 2019 Copyright:
                <a href="/"> Juan David Gómez</a>
            </div>
        </footer>
    )
  }
}
