const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forcast = require('./utils/forecast.js')

const app = express()

const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath  = path.join(__dirname, '../templates/partials')

// Setup handlers engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to server
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Tuncay M.Aliev'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name: 'Tuncay M.Aliev'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    helpText: 'This is some helpful text.',
    title: 'Help',
    name: 'Tuncay M.Aliev'
  })
})


app.get('/weather', (req, res) => {
  if(!req.query.address) {
    return res.send({
      error: 'You must provide an address'
    })
  }

  geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {  
    if(error) {
      return res.send({ error })
    }

      forcast(latitude, longitude, (error, forcastData) => {
        if(error) {
          return res.send({ error })
        }

        res.send({
          forcast: forcastData,
          location,
          address: req.query.address
        })

      })
  })
})

app.get('/products', (req, res) => {
  if(!req.query.search) {
    return res.send({
      error: 'You must provide a search term'
    })
  }

  console.log(req.query.search)
  res.send({
    products: []
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    page: '404',
    name: 'Tuncay M.Aliev',
    errorMessage: 'Help article not found.'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Tuncay M.Aliev',
    errorMessage: 'Page not found.'
  })
})

app.listen(port, () => {
  console.log(`Server is up on port ${port}`)
})