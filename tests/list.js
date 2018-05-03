const { cities } = require('./currentcities');
const { sugar } = require('../values');


console.log(cities)
console.log("-----------------")
module.exports = function() {
    console.log('GROSSE LISTE SA MERE');
    console.log('------------------');
    console.log(cities)
    console.log(sugar)
    cities.fetchcurrent.forEach((city) => {
        console.log('%s %s', city.name, city.weather);
    })
}
module.exports()
