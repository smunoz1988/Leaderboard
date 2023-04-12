import './style.css';

const getDataServer = async () => {
  try {
    const response = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/hBfPl1kjDZ5eEwBSxYij/scores/', {
      method: 'GET'
    })
  } catch (error) {
    console.log('Error')   
  }
}

const scores = { //this has to be the data received by API
    "result": [
        {
            "user": "John Doe",
            "score": 42
        },
        {
            "user": "Peter Parker",
            "score": 35
        },
        {
            "user": "Wonder Woman",
            "score": 50
        }
    ]
};

const generateScoreItem = (score) => {
  let itemScore = `<div>${score.user}:${score.score}</div>`;
  return itemScore;
};

const renderScores = () => {
  const scoreContainer = document.getElementById('scoresContainer');
  scoreContainer.innerHTML = '';
  scores.result.forEach((score) => {
    let itemScore = generateScoreItem(score);
    scoreContainer.innerHTML += itemScore;
  });
};

const postDataServer = async (inputData) => {
  try {
    const response = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/hBfPl1kjDZ5eEwBSxYij/scores/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputData),
    });
    const responseReceived = await response.json();
    console.log(responseReceived);
  } catch (error) {
    console.log(error);
  }
}

postDataServer({ "user": "Wonder Woman", "score": 50 })
renderScores();