import React, { Component } from 'react';

class Public extends Component {
    state = {
        message: "",
        error: ""
    }
    componentDidMount() {
        fetch("/public")
            .then(response => {
                if(response.ok) return response.json();
                throw new Error("Network error")
            })
            .then(response => this.setState({message: response.message}))
            .catch(error => this.setState({message: error.message}))
    }
    
    render() {
        return (
            <p>{this.state.message}</p>
        );
    }
}

export default Public;