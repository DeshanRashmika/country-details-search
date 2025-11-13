const API_KEY = "f11dcbc28aa54e69b6c90145251211";

function searchCity() {
  const city = document.getElementById("cityInput").value.trim();

  if (!city) {
    alert("Please enter a city name!");
    return;
  }

  fetch(`http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`)
    .then(res => res.json())
    .then(weatherData => {
      console.log("Weather data:", weatherData);

      document.getElementById("city").innerText = `City: ${weatherData.location.name}`;
      document.getElementById("country").innerText = `Country: ${weatherData.location.country}`;
      document.getElementById("temp").innerText = `Temperature: ${weatherData.current.temp_c}°C`;
      document.getElementById("condition").innerText = `Condition: ${weatherData.current.condition.text}`;
      document.getElementById("humidity").innerText = `Humidity: ${weatherData.current.humidity}%`;
      document.getElementById("wind").innerText = `Wind: ${weatherData.current.wind_kph} kph (${weatherData.current.wind_dir})`;
      document.getElementById("weatherIcon").src = `https:${weatherData.current.condition.icon}`;

      const countryName = weatherData.location.country;
      return fetch(`https://restcountries.com/v3.1/name/${countryName}`);
    })
    .then(res => res.json())
    .then(countryData => {
      console.log("Country data:", countryData);
      const c = countryData[0];
      document.getElementById("flagimage").innerHTML = `<img src="${c.flags.png}" alt="flag">`;
      document.getElementById("capital").innerText = `Capital: ${c.capital ? c.capital[0] : "N/A"}`;
      document.getElementById("region").innerText = `Region: ${c.region}`;
      document.getElementById("population").innerText = `Population: ${c.population.toLocaleString()}`;
      
      const currency = Object.values(c.currencies)[0];
      document.getElementById("currency").innerText = `Currency: ${currency.name} (${currency.symbol})`;

      document.getElementById("startOfWeek").innerText = `Start of Week: ${c.startOfWeek}`;
    })
    .catch(err => {
      console.error("Error:", err);
      alert("City not found or error fetching data.");
    });
}

document.getElementById("searchBtn").addEventListener("click", searchCity);
document.getElementById("cityInput").addEventListener("keypress", e => {
  if (e.key === "Enter") searchCity();
});