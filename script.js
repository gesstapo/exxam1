const apiKey = '8bf1c6fc36d868dd1e39315d0a2453c7';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

function getWeather() {
    const city = document.getElementById('city').value.trim();
    if (city === "") {
        alert("Будь ласка, введіть назву міста.");
        return;
    }

    const url = `${apiUrl}?q=${city}&appid=${apiKey}&units=metric&lang=uk`; // Метричні одиниці, українська мова

    // Використовуємо Fetch API для отримання даних
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Не вдалося отримати дані для цього міста');
            }
            return response.json();
        })
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            document.getElementById('weatherInfo').innerHTML = `<p style="color: red;">${error.message}</p>`;
        });
}

function displayWeather(data) {
    const { name, main, wind, weather } = data;
    const temperature = main.temp;
    const humidity = main.humidity;
    const windSpeed = wind.speed;
    const description = weather[0].description;

    // Відображення погоди
    const weatherHtml = `
        <h2>Погода в місті ${name}</h2>
        <p><strong>Температура:</strong> ${temperature}°C</p>
        <p><strong>Вологість:</strong> ${humidity}%</p>
        <p><strong>Швидкість вітру:</strong> ${windSpeed} м/с</p>
        <p><strong>Опис:</strong> ${description}</p>
    `;

    document.getElementById('weatherInfo').innerHTML = weatherHtml;
}
