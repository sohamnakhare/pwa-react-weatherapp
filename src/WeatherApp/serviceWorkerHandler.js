export const registerServiceWorker = () => {
    Notification.requestPermission(function (status) {
        console.log('Notification permission status:', status);
    });
    // TODO add service worker code here
    if ('serviceWorker' in navigator && 'PushManager' in window) {
        navigator.serviceWorker
            .register('./service-worker.js')
            .then(function (swReg) {
                console.log('Service worker Registered', swReg);
                // app.swRegistration = swReg;
                // initializeUI();
            });
    }
};

export const displayNotification = () => {
    if (Notification.permission == 'granted') {
        navigator.serviceWorker.getRegistration().then(function (reg) {
            var options = {
                body: 'Here is a notification body!',
                icon: 'images/notification-flat.png',
                vibrate: [100, 50, 100],
                data: {
                    dateOfArrival: Date.now(),
                    primaryKey: 1
                },
                actions: [
                    {
                        action: 'explore', title: 'Explore this new world',
                        icon: 'images/checkmark.png'
                    },
                    {
                        action: 'close', title: 'Close notification',
                        icon: 'images/xmark.png'
                    },
                ]
            };
            reg.showNotification('Hello world!', options);
        });
    }
}