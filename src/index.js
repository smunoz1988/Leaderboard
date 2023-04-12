import './style.css';

const getDataServer = async () => {
  try {
    const response = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/hBfPl1kjDZ5eEwBSxYij/scores/', {
      method: 'GET',
    });
    const responseDataApi = await response.json();
    return responseDataApi;
  } catch (error) {
    return error;   
  }
}


const generateScoreItem = (score) => {
  let itemScore = `<div>${score.user}:${score.score}</div>`;
  return itemScore;
};

const renderScores = async () => {
  try {
    const score = await getDataServer();
    const { result } = score;
    const scoreContainer = document.getElementById('scoresContainer');
    scoreContainer.innerHTML = '';
    result.forEach((score) => {
    let itemScore = generateScoreItem(score);
    scoreContainer.innerHTML += itemScore;
  });
  } catch (error) {
    return error;
  }
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
    return error;
  }
}

//postDataServer({ "user": "test 333", "score": 40 });
renderScores();