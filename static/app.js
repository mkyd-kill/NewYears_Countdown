const days = document.getElementById("days");
const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");

const currentYear = new Date().getFullYear();

const newYearTime = new Date(`January 1 ${currentYear + 1} 00:00:00`);

// countdown timer update
function updateCountdowntime() {
    const currentTime = new Date();
    const diff = newYearTime - currentTime;

    const d = Math.floor(diff / 1000 / 60 / 60 / 24);
    const h = Math.floor(diff / 1000 / 60 / 60) % 24;
    const m = Math.floor(diff / 1000 / 60) % 60;
    const s = Math.floor(diff / 1000) % 60;

    days.innerHTML = d;
    hours.innerHTML = h < 10 ? '0' + h : h;
    minutes.innerHTML = m < 10 ? '0' + m : m;
    seconds.innerHTML = s < 10 ? '0' + s : s;
}

// setting interval
setInterval(updateCountdowntime, 1000);

// make sure service workers are supported
(function() {
    if (navigator.serviceWorker) {
        // registration when the window loads
        window.addEventListener('load', function() {
            navigator.serviceWorker.register("/worker.js", { scope: '/home' })
                .then(function(registration) {
                    // Registration was successful
                    console.log('ServiceWorker registration successful with scope: ', registration.scope);
                    return registration;
                }, function(err) {
                    // registration failed :(
                    console.log('ServiceWorker registration failed: ', err);
                });
        });
    }
})();

// automatic background theme change
(function() {
    var curImgId = 0;
    var numberOfImages = 5; // Change this to the number of background images
    window.setInterval(function() {
        $('body').css('background', 'url("' + curImgId + '.jpg")'); // set the image path here
        curImgId = (curImgId + 1) % numberOfImages;
    }, 15 * 1000);
})();