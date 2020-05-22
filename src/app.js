const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geoCode = require('./utils/geoCode');
const foreCast = require('./utils/foreCast');

const app = express();

//Define paths for Express Config
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');

//Setup Handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialPath);
//Setup directory to Serve
app.use(express.static(publicDirPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Andrew'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        copyright: 'Vidhya',
        title: 'About Page',
        name: 'Vidhya'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helptext: 'Contact this number for customer Support',
        title: 'Help Page',
        name: 'Vidhya'
    })
})

// app.get('/help', (req, res) => {
//     res.send([{
//         name: 'Andrew',
//         age: 25
//     },
//     {
//         name: 'Sarah',
//         age: 20
//     }]);
// });

// app.get('/about', (req, res) => {
//     res.send('<h2> About Page </h2>');
// })

app.get('/weather', (req, res) => {
    debugger
    if (!req.query.address) {
        return res.send({
            error: 'You Must provide an address'
        })
    }

    geoCode(req.query.address, (error, geoData) => {
        if (error) {
            return res.send({ error });
        }
        foreCast(req.query.address, (error, foreCastData) => {
            if (error) {
                return res.send({
                    code: 404,
                    message: 'Error'
                });
            }

            res.send({
                msg: "success",
                geoData: geoData,
                foreCastData: foreCastData,
                currentTemperature: 0,
                feelslike: 10,
                location: req.query.address
            });

        })
    })


})


app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'you must provide a search term'
        })
    }

    console.log(req.query.search);
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('error404', {
        title: 'Error',
        name: 'Vidhya',
        error: "Help article not found"
    })
})

app.get('*', (req, res) => {
    res.render('error404', {
        title: 'Error',
        name: 'Vidhya',
        error: 'Page Not Found'
    });
});

app.listen(3010, () => {
    console.log("Server is up on the port no 3000");
});