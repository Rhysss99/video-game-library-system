const addGameButton = document.querySelector('.add-button');

let myGameLibrary = [];

// Creates a game class and contains a constructor for the game class containing the 4 parameters below
class Game {
  constructor(gameName, gameGenre, gamePlayed, gameTimePlayed) {
    this.gameName = gameName;
    this.gameGenre = gameGenre;
    this.gamePlayed = gamePlayed;
    this.gameTimePlayed = gameTimePlayed;
  }

  togglePlayedStatus() {
    this.gamePlayed = !this.gamePlayed;
  }
}
if (localStorage.getItem('games') === null) {
  myGameLibrary = [];
} else {
  const gamesLocalStorage = JSON.parse(localStorage.getItem('games'));
  myGameLibrary = gamesLocalStorage.map(
    ({ gameName, gameGenre, gamePlayed, gameTimePlayed }) =>
      new Game(gameName, gameGenre, gamePlayed, gameTimePlayed)
  );
}

// Creates a new game object and adds it to the myGameLibrary array
function addGameToLibrary(gameName, gameGenre, gamePlayed, gameTimePlayed) {
  const game = new Game(gameName, gameGenre, gamePlayed, gameTimePlayed);
  myGameLibrary.push(game);
}

function saveLibraryToStorage() {
  localStorage.setItem('games', JSON.stringify(myGameLibrary));
}

function removeGameFromLibrary(index) {
  myGameLibrary.splice(index, 1);
  saveLibraryToStorage();
}
function showTotalGameInfo() {
  const totalGamesPlayed = document.querySelector('.games-played');
  const totalGamesNotPlayed = document.querySelector('.games-not-played');
  const totalGames = document.querySelector('.total-games');
  let playedCounter = 0;
  let notPlayedCounter = 0;
  playedCounter = myGameLibrary.filter((game) => game.gamePlayed).length;
  notPlayedCounter = myGameLibrary.filter((game) => !game.gamePlayed).length;

  totalGamesPlayed.textContent = `Played Games: ${playedCounter}`;
  totalGamesNotPlayed.textContent = `Not Played Games: ${notPlayedCounter}`;
  totalGames.textContent = `Total Games: ${myGameLibrary.length}`;
}

// Generates a new row and details for each game detail for each game added to the array
function displayArray(filter) {
  // save array to local storage
  saveLibraryToStorage();

  showTotalGameInfo();
  const gameList = document.querySelector('#table-body');
  gameList.textContent = '';

  let filteredGames;
  if (filter === 'true') {
    filteredGames = myGameLibrary.filter((game) => game.gamePlayed === true);
  } else if (filter === 'false') {
    filteredGames = myGameLibrary.filter((game) => game.gamePlayed === false);
  } else {
    filteredGames = myGameLibrary;
  }

  filteredGames.forEach((game, index) => {
    const gameRow = document.createElement('tr');
    gameRow.classList.add('game-info-row');
    gameList.appendChild(gameRow);

    const gameDetails = [
      game.gameName,
      game.gameGenre,
      game.gamePlayed,
      game.gameTimePlayed,
      game.gameRemove,
    ];
    gameDetails.forEach((detail, detailIndex) => {
      const gameDetail = document.createElement('td');
      gameDetail.textContent = detail;

      if (detailIndex === 2) {
        // Add click event listener to the "Played" column
        gameDetail.classList.add('game-played');
        gameDetail.addEventListener('click', () => {
          game.togglePlayedStatus();
          saveLibraryToStorage();
          gameDetail.textContent = game.gamePlayed ? 'true' : 'false';
        });
      }
      if (detailIndex === 4) {
        gameDetail.classList.add('game-remove');
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', () => {
          removeGameFromLibrary(index);
          gameRow.remove();
        });
        gameDetail.appendChild(removeButton);
      }

      gameRow.appendChild(gameDetail);
    });
  });
}

document.getElementById('filter').addEventListener('change', (event) => {
  const filter = event.target.value;
  displayArray(filter);
});

// Calls the addGameToLibrary and DisplayArray functions if the user enters values inside the input boxes
function validation() {
  const form = document.querySelector('form');
  const gameNameInput = document.querySelector('#game-name');
  const gameGenreInput = document.querySelector('#game-genre');
  const checkbox = document.querySelector('input[name="checkbox"]');
  const gameTimePlayedInput = document.querySelector('#game-time-played');

  if (
    gameNameInput.value !== '' &&
    gameGenreInput.value !== '' &&
    gameTimePlayedInput.value !== ''
  ) {
    const gamePlayed = checkbox.checked;
    addGameToLibrary(
      gameNameInput.value,
      gameGenreInput.value,
      gamePlayed,
      gameTimePlayedInput.value
    );
    form.reset();
    displayArray();
  }
}
displayArray();
// on click calls the validate function
addGameButton.addEventListener('click', validation);

/* 
Bugs:
-When the user refreshes the page they can no longer amend the value inside 'played'
-When the user changes the value of 'played' this is not updated in local storage


Possible Additions:
-Add a 'remove all' button
-Add a backend instead of using local storage
-Improve CSS

*/
