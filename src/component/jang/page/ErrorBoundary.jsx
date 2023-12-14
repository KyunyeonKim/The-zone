import React, {Component} from 'react';
import Modal from 'react-modal';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, showModal: false, errorMessage: '' };
        window.onerror = function (message, source, lineno, colno, error) {
            console.error(error);
            this.setState({ hasError: true, errorMessage: 'Synchronous error occurred' });
            this.openModal();
        }.bind(this);
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error(error, errorInfo);
    }

    openModal = () => {
        this.setState({ showModal: true });
    };

    closeModal = () => {
        this.setState({ showModal: false });
    };

    render() {
        const { hasError, showModal, errorMessage } = this.state;

        if (hasError) {
            return (
                <div>
                    <h1>에러가 발생했습니다.</h1>
                    <button onClick={this.openModal}>에러 창 열기</button>
                    <Modal isOpen={showModal} onRequestClose={this.closeModal}>
                        <h2>에러 발생</h2>
                        <p>{errorMessage}</p>
                        <button onClick={this.closeModal}>닫기</button>
                    </Modal>
                </div>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
