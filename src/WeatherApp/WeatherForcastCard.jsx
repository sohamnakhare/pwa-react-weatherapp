import React, { Component } from 'react';

const WeatherForcastCard = (props) => (
    <div className="card weather-forecast">
        <div className="city-key" hidden></div>
        <div className="card-last-updated" hidden></div>
        <div className="location">{props.weatherUpdate.channel.title}</div>
        <div className="date">{props.weatherUpdate.channel.item.condition.date}</div>
        <div className="description">{props.weatherUpdate.channel.item.condition.text}</div>
        <div className="current">
            <div className="visual">
                <div className={(()=>{
                    let className = "icon ";
                    className = className +
                    getIconClass(props.weatherUpdate.channel.item.condition.code);
                    return className;
                })()}></div>
                <div className="temperature">
                    <span className="value">{Math.round(props.weatherUpdate.channel.item.condition.temp)}</span>
                    <span className="scale">°F</span>
                </div>
            </div>
            <div className="description">
                <div className="humidity">{props.weatherUpdate.channel.atmosphere.humidity}</div>
                <div className="wind">
                    <span className="value">{Math.round(props.weatherUpdate.channel.wind.speed)}</span>
                    <span className="scale">mph</span>
                    <span className="direction">{props.weatherUpdate.channel.wind.direction}</span>°
                </div>
                <div className="sunrise">{props.weatherUpdate.channel.astronomy.sunrise}</div>
                <div className="sunset">{props.weatherUpdate.channel.astronomy.sunset}</div>
            </div>
        </div>
    </div>
);

const getIconClass = (weatherCode) => {
    // Weather codes: https://developer.yahoo.com/weather/documentation.html#codes
    weatherCode = parseInt(weatherCode);
    switch (weatherCode) {
        case 25: // cold
        case 32: // sunny
        case 33: // fair (night)
        case 34: // fair (day)
        case 36: // hot
        case 3200: // not available
            return 'clear-day';
        case 0: // tornado
        case 1: // tropical storm
        case 2: // hurricane
        case 6: // mixed rain and sleet
        case 8: // freezing drizzle
        case 9: // drizzle
        case 10: // freezing rain
        case 11: // showers
        case 12: // showers
        case 17: // hail
        case 35: // mixed rain and hail
        case 40: // scattered showers
            return 'rain';
        case 3: // severe thunderstorms
        case 4: // thunderstorms
        case 37: // isolated thunderstorms
        case 38: // scattered thunderstorms
        case 39: // scattered thunderstorms (not a typo)
        case 45: // thundershowers
        case 47: // isolated thundershowers
            return 'thunderstorms';
        case 5: // mixed rain and snow
        case 7: // mixed snow and sleet
        case 13: // snow flurries
        case 14: // light snow showers
        case 16: // snow
        case 18: // sleet
        case 41: // heavy snow
        case 42: // scattered snow showers
        case 43: // heavy snow
        case 46: // snow showers
            return 'snow';
        case 15: // blowing snow
        case 19: // dust
        case 20: // foggy
        case 21: // haze
        case 22: // smoky
            return 'fog';
        case 24: // windy
        case 23: // blustery
            return 'windy';
        case 26: // cloudy
        case 27: // mostly cloudy (night)
        case 28: // mostly cloudy (day)
        case 31: // clear (night)
            return 'cloudy';
        case 29: // partly cloudy (night)
        case 30: // partly cloudy (day)
        case 44: // partly cloudy
            return 'partly-cloudy-day';
    }
};

export default WeatherForcastCard;