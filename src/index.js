import './style.css';

const getDataServer = async () => {
  try {
    const response = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/hBfPl1kjDZ5eEwBSxYij/scores/', {
      method: 'GET'
    })
  } catch (error) {
    
  }
}