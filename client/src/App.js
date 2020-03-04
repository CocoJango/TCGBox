import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
    constructor(props)
    {
        super(props);
        this.state = {apiResponse: ""};
    }

    callAPI()
    {
        fetch("http://localhost:9000/")
            .then(res => res.json())
            .then(res => this.setState({apiResponse: res.title}));
    }

    componentDidMount()
    {
        this.callAPI();
    }

    render()
    {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <p className="App-intro">{this.state.apiResponse}</p>
                </header>
            </div>
        );
    }

}

export default App;
