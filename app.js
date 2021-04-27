const express = require("express");
const app = express();
const fs = require('fs');
const path = require('path');
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('/views', 'views');

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.get('/quote', (req, res) => {

    fs.readFile('./JSON/quote.json', 'utf8', (err, jsonString) => {

        console.log('File data:', jsonString)
        var quotesArray = JSON.parse(jsonString)
        const maxVal = quotesArray.length - 1
        const randomInt = getRandomIntInclusive(0, maxVal);
        const randomQuote = quotesArray[randomInt]
        res.render("template", {
            quote: randomQuote
        })
    })
});

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor( Math.random() * (max - min + 1) + min);
}


app.listen(PORT, () => {
    console.log(`Example app is Listening at http://localhost:${PORT}`);

});

//    fs.readFile('./JSON/quote.json', 'utf8', (err, data) => {
//     console.log(data);
//     let readData = JSON.parse(data);

//     // res.send(readData[1]);
//     res.render("template", {
//         quote: readData[3]


/*
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
    //The maximum is inclusive and the minimum is inclusive
}
*/