const express = require('express');
const exphbs = require('express-handlebars');
const app = express();



app.set('views', __dirname + '/');
app.engine('hbs', exphbs({
    extname: 'hbs',
    defaultLayout: 'main.hbs'
}));
app.set('view engine', 'hbs');

app.get('/', function(req, res) {
    console.log('data   agsfagf');
    res.render('index1');
});

app.listen(3000, () => {
    console.log('Example app is running → PORT 3000');
})