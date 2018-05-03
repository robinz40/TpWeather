#!/usr/bin/env node
const program = require('commander')
const request = require('axios')
const inquirer = require("inquirer")
const dateFormat = require('dateformat');

let now= Date.now()


let choiceCity = [
    {
        type: "list",
        name: "City",
        message: "Choose the city :",
        choices: [
            "Bordeaux",
            "Lyon",
            "Marseille",
            "Nantes",
            "Paris",
        ]
    }
]
let choiceFive = [
    {
        type: "list",
        name: "City",
        message: "Choose the city :",
        choices: [
            "Bordeaux",
            "Lyon",
            "Marseille",
            "Nantes",
            "Paris",
        ]
    },
    {
        type: "list",
        name: "Time",
        message: "Choose the day :",
        choices: [
            dateFormat(now, "dddd, mmmm dS, yyyy"),
            dateFormat(now + 86400000, "dddd, mmmm dS, yyyy"),
            dateFormat(now + 86400000*2, "dddd, mmmm dS, yyyy"),
            dateFormat(now + 86400000*3, "dddd, mmmm dS, yyyy"),
            dateFormat(now + 86400000*4, "dddd, mmmm dS, yyyy")
        ]
    }
]
let databx = {}
let dataly = {}
let dataml = {}
let datant = {}
let dataps = {}

program
    .version('1.0.1')
    .option('-c, --current', 'Show current weather for a city')
    .option('-f, --fivedays', 'Show weather details all 3 hours for a city during 5 days')
    .option('-s, --sixteendays', 'Show day\'s weather for a city during 16 days')

program.parse(process.argv)


if (program.current) {
    console.log(`Current weather`)
    inquirer.prompt(choiceCity).then(function (answers){
        const getcurrentweather = async () => {
            try {

                databx = await request.get('https://api.openweathermap.org/data/2.5/weather?q=Bordeaux&APPID=faff0d791288fe7346e58eaaa43ba313')
                dataly = await request.get('https://api.openweathermap.org/data/2.5/weather?q=Lyon&APPID=faff0d791288fe7346e58eaaa43ba313')
                dataml = await request.get('https://api.openweathermap.org/data/2.5/weather?q=Marseille&APPID=faff0d791288fe7346e58eaaa43ba313')
                datant = await request.get('https://api.openweathermap.org/data/2.5/weather?q=Nantes&APPID=faff0d791288fe7346e58eaaa43ba313')
                dataps = await request.get('https://api.openweathermap.org/data/2.5/weather?q=Paris&APPID=faff0d791288fe7346e58eaaa43ba313')
                cities = [
                    {name: 'Bordeaux', temperature: databx.data.main.temp, humidite: databx.data.main.humidity, globalweather: databx.data.weather["0"].main, description: databx.data.weather["0"].description, windspeed: databx.data.wind.speed},
                    {name: 'Lyon', temperature: dataly.data.main.temp, humidite: dataly.data.main.humidity, globalweather: dataly.data.weather["0"].main, description: dataly.data.weather["0"].description, windspeed: dataly.data.wind.speed},
                    {name: 'Marseille', temperature: dataml.data.main.temp, humidite: dataml.data.main.humidity, globalweather: dataml.data.weather["0"].main, description: dataml.data.weather["0"].description, windspeed: dataml.data.wind.speed},
                    {name: 'Paris', temperature: dataps.data.main.temp, humidite: dataps.data.main.humidity, globalweather: dataps.data.weather["0"].main, description: dataps.data.weather["0"].description, windspeed: dataps.data.wind.speed},
                    {name: 'Nantes', temperature: datant.data.main.temp, humidite: datant.data.main.humidity, globalweather: datant.data.weather["0"].main, description: datant.data.weather["0"].description, windspeed: datant.data.wind.speed},
                ];

                cities.forEach((city) => {
                    if (city.name == answers.City) {
                        console.log('------------------------------')
                        console.log(' Weather details for %s ' +
                            '\n------------------------------' +
                            '\nTemperature : %s°c' +
                            '\nGlobal weather : %s' +
                            '\nDetails : %s' +
                            '\nHumidity : %s %' +
                            '\nWind speed : %s km/h',
                            city.name, Math.round(city.temperature-273.15), city.globalweather, city.description, city.humidite, Math.round(city.windspeed*3.6));
            }
                })
            }
            catch (err) {
                console.log('Error : '+err.message)
            }
        }
        getcurrentweather()
    })
}


 else if (program.fivedays) {
    console.log(`Weather details all 3 hours for a city during 5 days`)
        inquirer.prompt(choiceFive).then(function (answers) {
            console.log('/////////////')
            const getfivedayweather = async () => {
                try {

                    databx = await request.get('https://api.openweathermap.org/data/2.5/forecast?q=Bordeaux&APPID=faff0d791288fe7346e58eaaa43ba313')
                    dataly = await request.get('https://api.openweathermap.org/data/2.5/forecast?q=Lyon&APPID=faff0d791288fe7346e58eaaa43ba313')
                    dataml = await request.get('https://api.openweathermap.org/data/2.5/forecast?q=Marseille&APPID=faff0d791288fe7346e58eaaa43ba313')
                    datant = await request.get('https://api.openweathermap.org/data/2.5/forecast?q=Nantes&APPID=faff0d791288fe7346e58eaaa43ba313')
                    dataps = await request.get('https://api.openweathermap.org/data/2.5/forecast?q=Paris&APPID=faff0d791288fe7346e58eaaa43ba313')
                    cities = [
                        {
                            name: 'Bordeaux',
                            time: databx.list["0"].dt,
                            temperature: databx.data.list["0"].main.temp,
                            humidite: databx.data.list["0"].main.humidity,
                            globalweather: databx.data.list["0"].weather["0"].main,
                            description: databx.data.list["0"].weather["0"].description,
                            windspeed: databx.data.list["0"].wind.speed
                        },
                        {
                            name: 'Lyon',
                            time: databx.list["0"].dt,
                            temperature: dataly.data.list["0"].main.temp,
                            humidite: dataly.data.list["0"].main.humidity,
                            globalweather: dataly.data.list["0"].weather["0"].main,
                            description: dataly.data.list["0"].weather["0"].description,
                            windspeed: dataly.data.list["0"].wind.speed
                        },
                        {
                            name: 'Marseille',
                            time: databx.list["0"].dt,
                            temperature: dataml.data.list["0"].main.temp,
                            humidite: dataml.data.list["0"].main.humidity,
                            globalweather: dataml.data.list["0"].weather["0"].main,
                            description: dataml.data.list["0"].weather["0"].description,
                            windspeed: dataml.data.list["0"].wind.speed
                        },
                        {
                            name: 'Paris',
                            time: databx.list["0"].dt,
                            temperature: dataps.data.list["0"].main.temp,
                            humidite: dataps.data.list["0"].main.humidity,
                            globalweather: dataps.data.list["0"].weather["0"].main,
                            description: dataps.data.list["0"].weather["0"].description,
                            windspeed: dataps.data.list["0"].wind.speed
                        },
                        {
                            name: 'Nantes',
                            time: databx.list["0"].dt,
                            temperature: datant.data.list["0"].main.temp,
                            humidite: datant.data.list["0"].main.humidity,
                            globalweather: datant.data.list["0"].weather["0"].main,
                            description: datant.data.list["0"].weather["0"].description,
                            windspeed: datant.data.list["0"].wind.speed
                        },
                    ];

                    cities.forEach((city) => {
                        if (city.name == answers.City) {
                            if (city.time == answers.Time)
                            console.log('------------------------------')
                            console.log(' Weather details for ' +
                                '\nat %s' +
                                '\n------------------------------' +
                                '\nTemperature : %s°c' +
                                '\nGlobal weather : %s' +
                                '\nDetails : %s' +
                                '\nHumidity : %s %' +
                                '\nWind speed : %s km/h',
                                city.name, Math.round(city.temperature - 273.15), city.globalweather, city.description, city.humidite, Math.round(city.windspeed * 3.6));
                        }
                    })
                }
                catch (err) {
                    console.log('Error : ' + err.message)
                }
            }
            getfivedayweather()
        })


} else if (program.sixteendays) {
    console.log(`Show day's weather for a city during 16 days !`)
} else {
    program.help()
}