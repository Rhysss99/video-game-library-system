const addGameButton = document.querySelector('.add-button');

const myGameLibrary = [];

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
// Creates a new game object and adds it to the myGameLibrary array
function addGameToLibrary(gameName, gameGenre, gamePlayed, gameTimePlayed) {
  const game = new Game(gameName, gameGenre, gamePlayed, gameTimePlayed);
  myGameLibrary.push(game);
}

function removeGameFromLibrary(index) {
  myGameLibrary.splice(index, 1);
}
// Generates a new row and details for each game detail for each game added to the array
function displayArray() {
  const gameList = document.querySelector('#table-body');
  gameList.textContent = '';

  myGameLibrary.forEach((game, index) => {
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

// on click calls the validate function
addGameButton.addEventListener('click', validation);
