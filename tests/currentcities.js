const request = require("axios")
let databx = {}
let dataly = {}
let dataml = {}
let datant = {}
let dataps = {}
const fetchcurrent = async () => {
    try {
        databx = await request.get('https://api.openweathermap.org/data/2.5/weather?q=Bordeaux&APPID=faff0d791288fe7346e58eaaa43ba313')
        dataly = await request.get('https://api.openweathermap.org/data/2.5/weather?q=Lyon&APPID=faff0d791288fe7346e58eaaa43ba313')
        dataml = await request.get('https://api.openweathermap.org/data/2.5/weather?q=Marseille&APPID=faff0d791288fe7346e58eaaa43ba313')
        datant = await request.get('https://api.openweathermap.org/data/2.5/weather?q=Nantes&APPID=faff0d791288fe7346e58eaaa43ba313')
        dataps = await request.get('https://api.openweathermap.org/data/2.5/weather?q=Paris&APPID=faff0d791288fe7346e58eaaa43ba313')
        cities = [
            {name: 'Bordeaux', temperature: databx.data.main.temp, humidite: databx.data.main.humidity, globalweather: databx.data.weather["0"].main, description: databx.data.weather["0"].description, windspeed: databx.data.wind.speed},
            {name: 'Lyon', temperature: dataly.data.main.temp, humidite: dataly.data.main.humidity, globaweather: dataly.data.weather["0"].main, description: dataly.data.weather["0"].description, windspeed: dataly.data.wind.speed},
            {name: 'Marseille', temperature: dataml.data.main.temp, humidite: dataml.data.main.humidity, globaweather: dataml.data.weather["0"].main, description: dataml.data.weather["0"].description, windspeed: dataml.data.wind.speed},
            {name: 'Paris', temperature: dataps.data.main.temp, humidite: dataps.data.main.humidity, globaweather: dataps.data.weather["0"].main, description: dataps.data.weather["0"].description, windspeed: dataps.data.wind.speed},
            {name: 'Nantes', temperature: datant.data.main.temp, humidite: datant.data.main.humidity, globaweather: datant.data.weather["0"].main, description: datant.data.weather["0"].description, windspeed: datant.data.wind.speed},
        ];

        cities.forEach((city) => {
            console.log('%s %s', city.name, city.globalweather);
        })

    }
    catch (err) {
        console.log('Error : '+err.message)
    }
}
fetchcurrent()


