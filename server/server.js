const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({ extended: true }));

let playerData = [];
let gameRound = 0;

app.post('/new-player', (req, res) => {
    console.log('adding player', req.body);
    playerData.push(req.body);
    checkPlayers();
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

app.get('/round', (req, res) => {
    let gameRoundObject = {
        round: gameRound, 
    }
    res.send(gameRoundObject);
});

app.listen(PORT, () => {
    console.log(`Up and running on PORT: ${PORT}`);
});

function checkPlayers(){
    if(playerData.length == 4){
        playerData[Math.floor(Math.random() * 4)].turn = true;
        console.log(`${playerData[0].playerName}'s turn? ${playerData[0].turn}`);
        console.log(`${playerData[1].playerName}'s turn? ${playerData[1].turn}`);
        console.log(`${playerData[2].playerName}'s turn? ${playerData[2].turn}`);
        console.log(`${playerData[3].playerName}'s turn? ${playerData[3].turn}`);
        
        game();
    }
}

function game(){
    if(playersLeft() > 1){
        round();
    }else{
        playerData = [];
    }
}

function round(){
    gameRound++;
    for(let player of playerData){
        for(let i = 0; i < 5; i++){
            player.dice[i] = Math.floor(Math.random() * 6) + 1;
        }
        console.log(`${player.playerName} rolled ${player.dice[0]}, ${player.dice[1]}, ${player.dice[2]}, ${player.dice[3]}, ${player.dice[4]}`);
    }
    countDiceRolls();
}

function playersLeft(){
    let playersWithDice = 0;
    for(let player of playerData){
        if(player.diceRemaining > 0){
            playersWithDice++;
        }
    }
    return playersWithDice;
}

function countDiceRolls(){
    let rolls = {
        ones: 0,
        twos: 0,
        threes: 0,
        fours: 0,
        fives: 0,
        sixes: 0,
    }
    for(let player of playerData){
        for(let i = 0; i < 5; i++){
            if(player.dice[i] == 1){
                rolls.ones++;
            }
            if(player.dice[i] == 2){
                rolls.twos++;
            }
            if(player.dice[i] == 3){
                rolls.threes++;
            }
            if(player.dice[i] == 4){
                rolls.fours++;
            }
            if(player.dice[i] == 5){
                rolls.fives++;
            }
            if(player.dice[i] == 6){
                rolls.sixes++;
            }
        }
    }
    console.log(`ones:${rolls.ones} twos:${rolls.twos} threes:${rolls.threes} fours:${rolls.fours} fives:${rolls.fives} sixes:${rolls.sixes}`);
    
    return rolls;
}