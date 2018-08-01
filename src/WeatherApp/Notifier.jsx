import React, { Component } from "react";
import { displayNotification } from './serviceWorkerHandler.js';

const Notifier = (props) => (
    <div>
        <button className="js-notify-btn"
            style={{ width: '100%' }}
            onClick={displayNotification}>
            Notify me!</button>
    </div>
);

export default Notifier;