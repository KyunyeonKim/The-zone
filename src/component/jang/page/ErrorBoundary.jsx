import React, {Component} from 'react';
import Modal from 'react-modal';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, showModal: false, errorMessage: '' };
        window.onerror = function (message, source, lineno, colno, error) {
            console.error(error);
            this.setState({ hasError: true, errorMessage: 'Synchronous error occurred' });
            let currentLocation = window.location;
            // 새로운 URL로 리다이렉트
            window.location.href = currentLocation.protocol + '//' + currentLocation.host + '/error';
        }.bind(this);
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error(error, errorInfo);
    }

    openModal = () => {
        let currentLocation = window.location;
        // 새로운 URL로 리다이렉트
        window.location.href = currentLocation.protocol + '//' + currentLocation.host + '/error';
    };


    render() {
        const { hasError } = this.state;

        if (hasError) {
            return (
                <>{this.openModal()}</>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
