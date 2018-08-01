import React, { Component } from 'react';

class DataProvider extends Component {

    constructor(props) {
        super(props);

        this.state = {
            weatherUpdatesByLocation: []
        };

        this.getCurrentLocation = this.getCurrentLocation.bind(this);
        this.getForecast = this.getForecast.bind(this);
        this.getLocationInformaton = this.getLocationInformaton.bind(this);
    }

    componentDidMount() {
        this.getCurrentLocation();
    }

    getCurrentLocation() {
        const self = this;
        var options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };

        function success(pos) {
            self.getLocationInformaton(pos);
        }

        function error(err) {
            console.warn(`ERROR(${err.code}): ${err.message}`);
        }

        navigator.geolocation.getCurrentPosition(success, error, options);
    }

    getLocationInformaton(pos) {
        const self = this;
        var position = pos;
        var statement = 'SELECT * FROM geo.places WHERE text="(' + position.coords.latitude + ','
            + position.coords.longitude + ')"';
        var url = 'https://query.yahooapis.com/v1/public/yql?format=json&q=' +
            statement;

        var request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            if (request.readyState === XMLHttpRequest.DONE) {
                if (request.status === 200) {
                    var response = JSON.parse(request.response);
                    var results = response.query.results.place
                    var woeid = results.woeid;
                    var city = results.admin2.content + ', ' + results.admin1.content;
                    self.getForecast(woeid, city);
                }
            }
        };
        request.open('GET', url);
        request.send();
    }

    getForecast(key, label) {
        const self = this;
        var statement = 'select * from weather.forecast where woeid=' + key;
        var url = 'https://query.yahooapis.com/v1/public/yql?format=json&q=' +
            statement;
        // TODO add cache logic here

        if ('caches' in window) {
            /*
             * Check if the service worker has already cached this city's weather
             * data. If the service worker has the data, then display the cached
             * data while the app fetches the latest data.
             */
            caches.match(url).then(function (response) {
                if (response) {
                    response.json().then(function updateFromCache(json) {
                        var results = json.query.results;
                        results.key = key;
                        results.label = label;
                        results.created = json.query.created;
                        console.log('Cache Response: ', results);
                        const weatherUpdatesByLocation = self.state.weatherUpdatesByLocation;
                        weatherUpdatesByLocation.push(results);
                        self.setState({ weatherUpdatesByLocation });
                    });
                }
            });
        }
        // Fetch the latest data.
        var request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            if (request.readyState === XMLHttpRequest.DONE) {
                if (request.status === 200) {
                    var response = JSON.parse(request.response);
                    var results = response.query.results;
                    results.key = key;
                    results.label = label;
                    results.created = response.query.created;
                    const weatherUpdatesByLocation = self.state.weatherUpdatesByLocation;
                    weatherUpdatesByLocation.push(results);
                    self.setState({ weatherUpdatesByLocation });
                }
            } else {
                // Return the initial weather forecast since no data is available.
                // app.updateForecastCard(initialWeatherForecast);
            }
        };
        request.open('GET', url);
        request.send();
    }

    render() {
        const state = this.state;
        const { children } = this.props;
        const childrenWithProps = React.Children.map(children, child =>
            React.cloneElement(child, {
                ...state
            }));

        return <div>{childrenWithProps}</div>
    }
}

export default DataProvider;