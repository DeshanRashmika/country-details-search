const API_KEY = "f11dcbc28aa54e69b6c90145251211";

function searchCity() {
  const city = document.getElementById("cityInput").value;
  console.log(city);
  

  if (!city) {
      Swal.fire({
      icon: "error",
      title: "Please enter a city name",
      text: "City name cannot be empty.",
      footer: "Try Again"
});
  }

  fetch(`http://api.weatherapi.com/v1/current.json?key=f11dcbc28aa54e69b6c90145251211&q=${city}`)
    .then(res => res.json())
    .then(data => {
      console.log("Weather data:", data);

      document.getElementById("city").innerText = `City: ${data.location.name}`;
      document.getElementById("country").innerText = `Country: ${data.location.country}`;
      document.getElementById("temp").innerText = `Temperature: ${data.current.temp_c}°C`;
      document.getElementById("condition").innerText = `Condition: ${data.current.condition.text}`;
      document.getElementById("humidity").innerText = `Humidity: ${data.current.humidity}%`;
      document.getElementById("wind").innerText = `Wind: ${data.current.wind_kph} kph (${data.current.wind_dir})`;
      document.getElementById("weatherIcon").src = `https:${data.current.condition.icon}`;
    
    fetch(`https://restcountries.com/v3.1/name/${data.location.country}`)
    .then(res => res.json())
    .then(data => {
      console.log("Country data:", data);
      document.getElementById("countryName").innerText = `Country Name: ${data[0].name.common}`;
      document.getElementById("flagimage").innerHTML = `<img src="${data[0].flags.png}" alt="flag">`;
      document.getElementById("capital").innerText = `Capital: ${data[0].capital[0]}`;
      document.getElementById("region").innerText = `Region: ${data[0].region}`;
      document.getElementById("population").innerText = `Population: ${data[0].population.toLocaleString()}`;
      document.getElementById("languages").innerText = `Languages: ${data[0].tld}`;
      document.getElementById("currency").innerText = `Currency: ${data[0].currencies.LKR.name}`;
      document.getElementById("startOfWeek").innerText = `Start of Week: ${data[0].startOfWeek}`;
    });
});

document.getElementById("searchBtn").addEventListener("click", searchCity);
document.getElementById("cityInput").addEventListener("keypress", e => {
  if (e.key === "Enter") searchCity();
});

}