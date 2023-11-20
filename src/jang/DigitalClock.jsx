import React, { Component } from 'react';

class DigitalClock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            time: new Date().toLocaleTimeString(),
        };
    }

    componentDidMount() {
        this.intervalID = setInterval(() => this.updateTime(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.intervalID);
    }

    updateTime() {
        this.setState({
            time: new Date().toLocaleTimeString(),
        });
    }

    render() {
        const clockStyle = {
            textAlign: 'center',

            fontFamily: 'Arial, sans-serif',
        };

        const titleStyle = {
            fontSize: '24px',
            color: '#333',
        };

        const timeStyle = {
            fontSize: '36px',
            color: '#2568ac',
            marginTop: '60px',
            marginBottom:'45px',
            marginLeft:'20px',
            marginRight:'20px'
        };

        return (
            <div style={clockStyle} >
                <p style={timeStyle}>{this.state.time}</p>
            </div>
        );
    }
}

export default DigitalClock;