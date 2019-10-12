const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({ extended: true }));

let playerData = [];

app.post('/new-player', (req, res) => {
    console.log('adding player', req.body);
    playerData.push(req.body);
    res.sendStatus(200);

});

app.get('/player-count', (req, res) => {
    console.log('waiting route hit');
    let playerCount = {
        players: Number(playerData.length),
    }
    console.log('players:', playerCount);

    res.send(playerCount);

});

app.listen(PORT, () => {
    console.log(`Up and running on PORT: ${PORT}`);
});