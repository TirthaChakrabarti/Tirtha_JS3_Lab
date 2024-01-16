let apiDetails = {
    baseUrl: 'https://api.openweathermap.org/data/2.5/',
    apiKey: '7e3f21edee540e6110af347b55eb1ab2'
}

let search = document.getElementById('search-box')
search.addEventListener('keypress', setCityName)

function setCityName(e) {
    if (e.keyCode == 13) {
        getWeatherData(search.value);
    }
}

function getWeatherData(cityName) {
    fetch(`${apiDetails.baseUrl}weather?q=${cityName}&units=metric&appid=${apiDetails.apiKey}`)
    .then(res => res.json())
    .then(res => {
        console.log(res)
        displayResults(res)
    })
}

function displayResults(res) {

    let place = document.getElementById('place')
    place.innerText = `${res.name}, ${res.sys.country}`

    let temp = document.getElementById('temp-value')
    temp.innerText = `${Math.round(res.main.temp)}`

    let weather = document.getElementById('weather')
    weather.innerText = res.weather[0].main

    let tempRange = document.getElementById('temp-range')
    tempRange.innerText = `${Math.round(res.main.temp_min)}°c / ${Math.round(res.main.temp_max)}°c`

    let date = document.getElementById('date-time')
    date.innerText = getDateInfo();
}

function getDateInfo() {
    let todaysDate = new Date();
    console.log(todaysDate);

    let daysArr = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    let monthArr = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    return `${daysArr[todaysDate.getDay()]} ${todaysDate.getDate()} ${monthArr[todaysDate.getMonth()]} ${todaysDate.getFullYear()}`
}