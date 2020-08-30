const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

//directory
const publicDir = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../views');
const partialsPath = path.join(__dirname, '../views/partials');

//template engine
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//serving statica file
app.use(express.static(publicDir));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: '@DutchMan',
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name: '@DutchMan',
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: '@DutchMan',
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.adress) {
        return res.send({
            message: 'Please input adress',
        });
    }
    geocode(req.query.adress, (err, { latitude, longitude, location } = {}) => {
        if (err) {
            return res.send({
                error: err,
            });
        }
        forecast(latitude, longitude, (err, forecastRes) => {
            if (err) {
                return res.send({
                    error: err,
                });
            }
            res.send({
                location,
                forecast: forecastRes,
                adress: req.query.adress,
            });
        });
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        error: 'Help article not found',
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        error: 'Page not found',
    });
});

app.listen(port, () => {
    console.log(`listneing on port ${port}...`);
});
