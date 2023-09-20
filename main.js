import express from 'express';
import axios from 'axios';

const app = express();
const KEY = process.env.VITE_GAMES_API_KEY;

// platforms
app.get('/platforms/lists/parents', async(req, res) => {
  try {
    const response = await axios.get('https://api.rawg.io/api/platforms/lists/parents', {
        params: {...req.query,
            key: KEY
          }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// games
app.get('/games', async(req, res) => {
  try {
    const response = await axios.get('https://api.rawg.io/api/games', {
        params: {...req.query,
            key: KEY
          }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// genres
app.get('/genres', async(req, res) => {
  try {
    const response = await axios.get('https://api.rawg.io/api/genres', {
        params: {...req.query,
            key: KEY
          }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Run app
const port = 3000;
app.listen(port, () => {
  console.log(`Serving on port ${port}`);
});