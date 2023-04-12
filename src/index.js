import './style.css';

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

const generateScoreItem = (score) => {
  const itemScore = `<div>${score.user}:${score.score}</div>`;
  return itemScore;
};

const renderScores = async () => {
  try {
    const score = await getDataServer();
    const { result } = score;
    result.sort((a, b) => b.score - a.score);
    const scoreContainer = document.getElementById('scoresContainer');
    scoreContainer.innerHTML = '';
    result.forEach((score) => {
      const itemScore = generateScoreItem(score);
      scoreContainer.innerHTML += itemScore;
    });
  } catch (error) {
    return error;
  }
  return null;
};

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

const refreshBtn = document.getElementById('refreshBtn');
refreshBtn.addEventListener('click', renderScores);

const inputName = document.getElementById('inputName');
const inputScore = document.getElementById('inputScore');
const submitBtn = document.getElementById('submitBtn');

submitBtn.addEventListener('click', (e) => {
  e.preventDefault();
  if (!inputName.value || !inputScore.value) {
    return;
  }
  postDataServer({ user: inputName.value, score: inputScore.value });
  inputName.value = '';
  inputScore.value = '';
});