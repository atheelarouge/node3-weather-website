const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=d7023cb32063c5811aca13b25d890278&query=${longitude},${latitude}&units=M`

    request({ url, json: true },(error, {body}) => {
        if (error) {
            callback('Unable to connect to weather services', '')
        } else if (body.error) {
            callback('Unable to find location', '' )
        }
        else{
            callback('', `${body.current.weather_descriptions[0]}. it is currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike} degrees out. The humidity is ${body.current.humidity}.`)
        }
    })
}


module.exports = forecast