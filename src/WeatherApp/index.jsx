import React, { Component } from 'react';
import { registerServiceWorker } from './serviceWorkerHandler.js';
import DataProvider from './DataProvider.jsx';
import Header from './Header.jsx';
import WeatherForecast from './WeatherForcast.jsx';
import Notifier from './Notifier.jsx';
import './weather-app.css';

class WeatherApp extends Component {

    constructor() {
        super();
        registerServiceWorker();
    }

    render() {
        return (
            <DataProvider>
                <Header />
                <WeatherForecast />
                <Notifier/>
            </DataProvider>
        )
    }
}

export default WeatherApp;