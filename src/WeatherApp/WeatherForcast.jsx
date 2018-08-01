import React, {Component} from 'react';
import WeatherForcastCard from './WeatherForcastCard.jsx';

class WeatherForcast extends Component {

    render() {
        return (
            <div style={{paddingTop: 65}}>
                {
                    this.props.weatherUpdatesByLocation.map((weatherUpdate) => {
                        return (
                            <WeatherForcastCard weatherUpdate={weatherUpdate}/>
                        )
                    })
                }
            </div>
        )
    }
}

export default WeatherForcast;