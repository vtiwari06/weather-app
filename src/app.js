const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geoCode = require('./utils/geocode.js');
const foreCast = require('./utils/forecast.js');

console.log(__dirname);
console.log(__filename);
console.log(path.join(__dirname, '../public'));

const app = express();

const port = process.env.PORT || 3000;

// define path for express config
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// set handlebars engine and views location 
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// setup for statuc directory to serve
app.use(express.static(publicDirPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'weather app',
        name: 'Vivek'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'about page',
        name: 'Vivek'
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'help page',
        name: 'Vivek',
        msg: 'I am Vivek and I am here to help.'
    });
})

// app.get('', (req, res) => {
//     res.send('<h1>hello express</h1>');
// })

// app.get('/help', (req, res) => {
//     res.send({
//         name: "vivek",
//         age: "29"
//     });
// })

// app.get('/about', (req, res) => {
//     res.send('about page');
// })

app.get('/weather', (req, res) => {
    const { address } = req.query;
    if (!address) {
        return res.send({ error: "No address is present" });
    }
    geoCode(address, (error, { latitude, longitude } = {}) => {
        if (error) {
            return res.send("Unable to fetch response");
        } else {
            foreCast(latitude, longitude, (error, data) => {
                if (error) {
                    return res.send(error);
                } else {
                    res.send({
                        forecast: data.current.temperature + " degrees",
                        location: data.location.name,
                        address: address
                    });
                }
            })
        }
    });
})

app.get('/products', (req, res) => {
    const { search } = req.query;
    if (!search) {
        return res.send({ error: "No search query present" });
    }
    res.send({
        products: []
    });
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        msg: 'Help article not found.',
        name: 'Vivek'
    });
})

app.get('*', (req, res) => {
    res.render('404', {
        msg: 'Page not found.',
        name: 'Vivek'
    });
})

app.listen(port, () => {
    console.log('server is running on port '+ port);
})
