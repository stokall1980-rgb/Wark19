const API_KEY = "c25e8520524e5cb0b62a16654fd653de"; 
const searchButton = document.getElementById('search-button');
const cityInput = document.getElementById('city-input');
const weatherResultDiv = document.getElementById('weather-result');

// Fungsi utama untuk mengambil data cuaca
async function fetchWeather(city) {
    // 1. Buat URL API
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=id`;
    
    // Tampilkan pesan loading
    weatherResultDiv.innerHTML = '<p>Sedang mencari...</p>';

    try {
        // 2. Ambil data dari API menggunakan Fetch
        const response = await fetch(url);
        
        // Cek jika response tidak OK (misalnya kota tidak ditemukan)
        if (!response.ok) {
            if (response.status === 404) {
                 throw new Error(`Kota "${city}" tidak ditemukan. Coba nama kota lain.`);
            }
            throw new Error(`Terjadi kesalahan: ${response.status}`);
        }

        const data = await response.json();
        
        // 3. Tampilkan data yang sudah diformat
        displayWeather(data);

    } catch (error) {
        // Tangani error (misalnya koneksi atau API key salah)
        weatherResultDiv.innerHTML = `<p style="color: red;">Kesalahan: ${error.message}</p>`;
        console.error("Gagal mengambil data cuaca:", error);
    }
}

// Fungsi untuk menampilkan hasil cuaca di HTML
function displayWeather(data) {
    const cityName = data.name;
    const temp = data.main.temp;
    const description = data.weather[0].description;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed; // dalam meter/detik

    // Buat konten HTML
    weatherResultDiv.innerHTML = `
        <p class="city-name">${cityName}</p>
        <p>Suhu: <strong>${temp}°C</strong></p>
        <p>Kondisi: ${description.charAt(0).toUpperCase() + description.slice(1)}</p>
        <p>Kelembaban: ${humidity}%</p>
        <p>Kecepatan Angin: ${windSpeed} m/s</p>
    `;
}

// Event Listener: Jalankan fungsi fetchWeather ketika tombol diklik
searchButton.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        fetchWeather(city);
    } else {
        weatherResultDiv.innerHTML = '<p style="color: orange;">Mohon masukkan nama kota.</p>';
    }
});
