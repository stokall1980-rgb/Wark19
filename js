const body = document.getElementById("weather-body");
const rain = document.getElementById("rain");
const lightning = document.getElementById("lightning");
const stars = document.getElementById("stars");

/* ============================
   GENERATE EFEK HUJAN
   ============================ */
function generateRain() {
    rain.innerHTML = "";
    for (let i = 0; i < 100; i++) {
        const drop = document.createElement("div");
        drop.classList.add("rain-drop");
        drop.style.left = Math.random() * 100 + "vw";
        drop.style.animationDelay = Math.random() * 1 + "s";
        rain.appendChild(drop);
    }
}

/* ============================
   GENERATE BINTANG MALAM
   ============================ */
function generateStars() {
    stars.innerHTML = "";
    for (let i = 0; i < 80; i++) {
        const star = document.createElement("div");
        star.classList.add("star");
        star.style.left = Math.random() * 100 + "vw";
        star.style.top = Math.random() * 100 + "vh";
        star.style.animationDelay = Math.random() * 2 + "s";
        stars.appendChild(star);
    }
}

/* ============================
   EFEK KILAT BADAI
   ============================ */
function startLightning() {
    setInterval(() => {
        lightning.style.animation = "lightning-flash 0.8s";
        setTimeout(() => lightning.style.animation = "", 900);
    }, Math.random() * (5000 - 2000) + 2000); // kilat acak
}


/* ============================
   GANTI CUACA DINAMIS
   ============================ */
function setWeatherBackground(weather) {
    body.className = ""; // reset

    switch (weather) {
        case "clear":
            body.classList.add("sunny");
            break;

        case "clouds":
            body.classList.add("cloudy");
            break;

        case "rain":
            body.classList.add("rainy");
            generateRain();
            break;

        case "storm":
            body.classList.add("storm");
            generateRain();
            startLightning();
            break;

        case "night":
            body.classList.add("night");
            generateStars();
            break;
    }

    document.getElementById("weather-status").textContent =
        "Cuaca sekarang: " + weather;
}


/* ===================================
   TES: Ganti cuaca setiap klik tombol
   =================================== */

let testWeather = ["clear", "clouds", "rain", "storm", "night"];
let index = 0;

function changeWeather() {
    setWeatherBackground(testWeather[index]);
    index = (index + 1) % testWeather.length;
}

// Set default
setWeatherBackground("clear");
