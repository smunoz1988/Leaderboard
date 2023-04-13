import './style.css';

//  html elements
const inputName = document.getElementById('inputName');
const inputScore = document.getElementById('inputScore');
const submitBtn = document.getElementById('submitBtn');
const refreshBtn = document.getElementById('refreshBtn');

//  Get data from API
const getDataServer = async () => {
  try {
    const response = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/DjGnLPNMPeUjhLoQI02H/scores/', {
      method: 'GET',
    });
    const responseDataApi = await response.json();
    return responseDataApi;
  } catch (error) {
    return error;
  }
};

//  Send data to server
const postDataServer = async (inputData) => {
  try {
    const response = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/DjGnLPNMPeUjhLoQI02H/scores/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputData),
    });
    const responseReceived = await response.json();
    return responseReceived;
  } catch (error) {
    return error;
  }
};

//  Render scores on html after consuming API with getDataServer function
const generateScoreItem = (score, index) => {
  const itemScore = `
  <div class='rankContainer flex-row'>
    <p>${index + 1}</p>
    <p>${score.user}</p>
    <p>${score.score}</p>
  </div>
  `;
  return itemScore;
};

const renderScores = async () => {
  try {
    const score = await getDataServer();
    const { result } = score;
    result.sort((a, b) => b.score - a.score);
    const scoreContainer = document.getElementById('scoresContainer');
    scoreContainer.innerHTML = '';
    result.forEach((score, index) => {
      const itemScore = generateScoreItem(score, index);
      scoreContainer.innerHTML += itemScore;
    });
  } catch (error) {
    return error;
  }
  return null;
};

//  Button listeners to consume APIs
refreshBtn.addEventListener('click', renderScores);

submitBtn.addEventListener('click', (e) => {
  e.preventDefault();
  if (!inputName.value || !inputScore.value) {
    return;
  }
  postDataServer({ user: inputName.value, score: inputScore.value });
  inputName.value = '';
  inputScore.value = '';
});