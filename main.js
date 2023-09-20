import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
app.use(cors());

// Access the API key using import.meta.env
const KEY = process.env.VITE_GAMES_API_KEY;

const fetchFromRawg = async (url, req, res) => {
  try {
    const response = await axios.get(url, {
      params: { ...req.query, key: KEY }
    });
    // res.send('noice')
    res.json(response.data);
  } catch (error) {
    console.error(`Failed to fetch from RAWG API: ${error}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

app.get('/api/platforms/lists/parents', async (req, res) => {
  await fetchFromRawg('https://api.rawg.io/api/platforms/lists/parents', req, res);
});

app.get('/api/games', async (req, res) => {
  await fetchFromRawg('https://api.rawg.io/api/games', req, res);
});

app.get('/api/genres', async (req, res) => {
  await fetchFromRawg('https://api.rawg.io/api/genres', req, res);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Serving on port ${port}`);
});
