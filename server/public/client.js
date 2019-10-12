$(onReady);

let playerCount = 0;

function onReady() {
    $('#addPlayerButton').click(newPlayer);
}

function newPlayer() {
    $.ajax({
        url: '/new-player',
        method: 'POST',
        data: {
            playerName: $('#playerNameInput').val(),
            dieCount: 5,
        }
    }).then(function (response) {
        console.log('new player response', response);
        $('.newPlayer').empty();
        $('.newPlayer').addClass('waiting');
        $('.waiting').append(`<p id="waiting">waiting</p>`);
        waiting();
    });

}

function waiting() {
    $('#waiting').append('.');

    $.ajax({
        url: '/player-count',
        method: 'GET'
    }).then(function (response) {
        playerCount = Number(response.players);
    });
    console.log('players: ', playerCount);

    if (playerCount > 3) {
        console.log('all players are here');
        $('.waiting').empty();
        $('.newPlayer').removeClass('waiting');
        $('.newPlayer').addClass('newGame');
        newGame();

    } else {
        setTimeout(() => {
            waiting();
        }, 5000);
    }
}

function newGame(){
    $('.newGame').append(`<p>New Game Area</p>`);
}