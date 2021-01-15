// mostly code from reactjs.ort/docs/error-boundaries.html

import React, { Component } from 'react';
import { Link, Redirect } from '@reach/router';

class ErrorBoundary extends Component {
    state = { hasError: false }
    static getDerivedStateFromError () {
        return { hasError: true };
    }
    componentDidCatch(error, info) {
        console.error("ErrorBoundary caught an error", error, info);
    }
    componentDidUpdate() {
        if (this.state.hasError) {
            setTimeout(() => this.setState({ redirect: true }), 5000);
        }
    }
    render () {
        if (this.state.redirect) {
            return <Redirect to="/" />
        }
        if (this.state.hasError) {
            return (
                <h1>
                    Heeyyooo, whoopsie poopsie!  
                    Head on back to the home page by <Link to="/">clicking here</Link>.
                </h1>
            )
        }

        return this.props.children
    }

}

export default ErrorBoundary;