function searchCountry() {
    const countryName = document.getElementById("countryInput").value.trim();
    
    if (!countryName) {
        alert("Please enter a country name!");
        return;
    }
    
    fetch(`https://restcountries.com/v3.1/name/${countryName}`)
    .then((response) => {
        if (!response.ok) {
            throw new Error("Country not found");
        }
        return response.json();
    })
    .then((data) => {
        document.getElementById("countryName").innerText = data[0].name.common;
        document.getElementById("flagimage").innerHTML = `<img src="${data[0].flags.png}" width="250">`;
        document.getElementById("capital").innerHTML = `<p>Capital : ${data[0].capital[0]}</p>`;
        document.getElementById("region").innerHTML = `<p>Region : ${data[0].region}</p>`;
        document.getElementById("population").innerHTML = `<p>Population : ${data[0].population}</p>`;
        document.getElementById("currency").innerHTML = `<p>Currency : ${currencies.name} (${tld.currencies})</p>`;
        document.getElementById("altSpellings").innerHTML = `<p>Top Level Domain : ${data[0].altSpellings[0]}</p>`;

        document.getElementById("languages").innerHTML = `<p>Languages : ${languages}</p>`;

        document.getElementById("timezone").innerHTML = `<p>Timezone : ${data[0].timezones[0]}</p>`;
    })

}

document.getElementById("searchBtn").addEventListener("click", searchCountry);

document.getElementById("countryInput").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        searchCountry();
    }
});